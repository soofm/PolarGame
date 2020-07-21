import { PlayerState } from './PlayerState'

export interface GameState {
  phase: number
  playerStates: PlayerState[]
}
