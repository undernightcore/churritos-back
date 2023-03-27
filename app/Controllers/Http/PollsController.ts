import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePollValidator from 'App/Validators/CreatePollValidator'
import Poll from 'App/Models/Poll'

export default class PollsController {
  public async create({ request, response }: HttpContextContract) {
    const data = await request.validate(CreatePollValidator)
    const poll = await Poll.create(data)
    return response.ok(poll)
  }
}
