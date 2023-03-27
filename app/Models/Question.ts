import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Poll from 'App/Models/Poll'
import Response from 'App/Models/Response'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public question: string

  @hasMany(() => Response)
  public responses: HasMany<typeof Response>

  @belongsTo(() => Poll)
  public poll: BelongsTo<typeof Poll>

  @column({ serializeAs: null })
  public pollId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
