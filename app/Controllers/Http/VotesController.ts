import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Poll from 'App/Models/Poll'
import CreateVoteValidator from 'App/Validators/CreateVoteValidator'
import Option from 'App/Models/Option'
import Ws from 'App/Services/ws'

export default class VotesController {
  public async get({ request, response, params }: HttpContextContract) {
    const password = request.header('password') ?? ''
    const poll = await Poll.findOrFail(params.id)
    const options = await poll.related('options').query().orderBy('name').withCount('votes')
    return poll.password && poll.password !== password
      ? response.forbidden({ errors: ['La contraseña no es correcta'] })
      : response.ok(options)
  }

  public async getByOption({ request, response, params }: HttpContextContract) {
    const password = request.header('password') ?? ''
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    const option = await Option.findOrFail(params.id)
    const poll = await Poll.findOrFail(option.pollId)
    if (poll.password && poll.password !== password)
      return response.forbidden({ errors: ['La contraseña no es correcta'] })
    const votes = await option
      .related('votes')
      .query()
      .orderBy('created_at', 'desc')
      .paginate(page, perPage)
    return response.ok(votes)
  }

  public async create({ request, response, params }: HttpContextContract) {
    const password = request.header('password') ?? ''
    const data = await request.validate(CreateVoteValidator)
    const poll = await Poll.findOrFail(params.id)
    const option = await Option.findOrFail(data.option)
    if (poll.password && poll.password !== password)
      return response.forbidden({ errors: ['La contraseña no es correcta'] })
    const vote = await option.related('votes').create({ name: data.name })
    Ws.io.emit(`poll:${poll.id}`, 'updated')
    Ws.io.emit(`option:${option.id}`, 'updated')
    return response.ok(vote)
  }
}
