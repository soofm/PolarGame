import { v4 as uuidv4 } from 'uuid'
import { Player } from './Player'

export class Room {
  get id (): string { return this._id }
  get name (): string { return this._name }

  addPlayer (): Player | null {
    if (Object.keys(this._players).length > 4) {
      return null
    }
    const player = new Player()
    player.draw(5)
    this._players[player.id] = player
    return player
  }

  getPlayer (playerId: string): Player | undefined {
    return this._players[playerId]
  }

  constructor (private readonly _name: string) {
    this._id = uuidv4()
    this._players = {}
  }

  private readonly _id: string
  private readonly _players: { [id: string]: Player }
}
