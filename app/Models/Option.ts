import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Poll from 'App/Models/Poll'
import Vote from 'App/Models/Vote'

export default class Option extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @hasMany(() => Vote)
  public votes: HasMany<typeof Vote>

  @belongsTo(() => Poll)
  public poll: BelongsTo<typeof Poll>

  @column({ serializeAs: null })
  public pollId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
