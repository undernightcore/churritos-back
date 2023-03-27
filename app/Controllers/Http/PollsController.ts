import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePollValidator from 'App/Validators/CreatePollValidator'
import Poll from 'App/Models/Poll'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PollsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePollValidator)
    await Database.transaction(async (trx) => {
      const poll = await Poll.create(data, { client: trx })
      await poll.related('options').createMany(
        data.options.map((option) => ({ title: option })),
        { client: trx }
      )
      await trx.commit()
      return response.ok(poll)
    })
  }

  public async get({ request, response, params }: HttpContextContract) {
    const password = request.header('password') ?? ''
    const poll = await Poll.findOrFail(params.id)
    await poll.load('options')
    return poll.password && poll.password !== password
      ? response.forbidden({ errors: ['La contraseña no es correcta'] })
      : response.ok(poll)
  }
}
