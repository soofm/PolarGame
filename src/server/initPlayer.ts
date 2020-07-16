import { Player } from '../common'

let playerId = 0

export function initPlayer (): Player {
  const id = playerId
  playerId += 1
  return ({
    id,
    hand: Array.from({ length: 6 }).map((_, i) => i < 4 ? 'blaster' : 'shields'),
    stats: {
      attack: 0,
      shields: 0
    }
  })
}
