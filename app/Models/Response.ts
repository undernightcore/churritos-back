import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from 'App/Models/Question'
import Vote from 'App/Models/Vote'

export default class Response extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public response: string

  @hasMany(() => Vote)
  public votes: HasMany<typeof Vote>

  @belongsTo(() => Question)
  public question: BelongsTo<typeof Question>

  @column({ serializeAs: null })
  public questionId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
