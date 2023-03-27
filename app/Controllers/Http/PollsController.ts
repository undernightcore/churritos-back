import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePollValidator from 'App/Validators/CreatePollValidator'
import Poll from 'App/Models/Poll'

export default class PollsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePollValidator)
    const poll = await Poll.create(data)
    return response.ok(poll)
  }

  public async get({ request, response, params }: HttpContextContract) {
    const password = request.input('password', '')
    const poll = await Poll.findOrFail(params.id)
    await poll.load('options')
    return poll.password && poll.password !== password
      ? response.forbidden({ errors: ['La contraseña no es correcta'] })
      : response.ok(poll)
  }
}
