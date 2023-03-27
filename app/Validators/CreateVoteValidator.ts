import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateVoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3)]),
    option: schema.number([
      rules.exists({ table: 'options', column: 'id', where: { poll_id: this.ctx.params.id } }),
    ]),
  })

  public messages: CustomMessages = {
    'name.required': 'Es necesario que envies tu nombre para la respuesta',
    'name.minLength': 'Venga ya... no me creo que tu nombre tenga menos de 3 carácteres',
    'option.required': 'Es necesario indicar a que opción has votado',
    'option.exists': 'No existe esa opción es esta encuesta',
  }
}
