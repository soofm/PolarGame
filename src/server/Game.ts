import { v4 as uuidv4 } from 'uuid'
import { Player } from './Player'
import { GameState } from '@/common'

export class Game {
  get roomId (): string { return this._roomId }

  addPlayer (): Player {
    if (this._players.length > 4) {
      throw new Error('Exceeded the limit of the number of players allowed in this room.')
    }
    const player = new Player()
    this._players.push(player)
    return player
  }

  removePlayer (playerId: string): void {
    const index = this._players.findIndex(player => player.id === playerId)
    if (index === -1) {
      throw new Error('Player not found.')
    }
    this._players.splice(index, 1)
  }

  getState (): GameState {
    return {
      phase: this._phase,
      playerStates: this._players.map(player => player.getState())
    }
  }

  getPlayers (): Player[] {
    return this._players
  }

  getPlayer (playerId: string): Player {
    const player = this._players.find(player => player.id === playerId)
    if (player == null) {
      throw new Error('Player not found.')
    }
    return player
  }

  start (): void {
    if (this._phase !== 0) {
      return
    }
    for (const player of this._players) {
      player.draw(5)
    }
    this._phase = 1
  }

  constructor () {
    this._roomId = uuidv4()
    this._players = []
    this._phase = 0
  }

  private readonly _roomId: string
  private readonly _players: Player[]
  private _phase: number
}
