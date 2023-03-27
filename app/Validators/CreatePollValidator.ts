import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class CreatePollValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3)]),
    description: schema.string.optional({ trim: true }, [rules.minLength(3)]),
    password: schema.string.optional({}, [rules.minLength(4)]),
    options: schema
      .array([rules.minLength(1)])
      .members(schema.string({ trim: true }, [rules.minLength(1)])),
  })

  public messages: CustomMessages = {
    'name.required': 'Necesito un nombre para la encuesta',
    'name.minLength': 'El nombre tiene que tener como mínimo 3 carácteres',
    'description.minLength': 'La descripción tiene que tener como mínimo 3 carácteres',
    'options.required': 'Es necesaria una lista de opciones',
    'options.minLength': 'Es necesario al menos una opción',
    'required': 'Es necesario que todas las reglas tengan al menos 1 carácter',
  }
}
