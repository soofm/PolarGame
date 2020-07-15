import * as io from 'socket.io-client'
import { Card } from '../common/card'
import * as cardList from '../assets/card_list.json'

class Player {
  addCard (card: Card): void {
    this._hand.concat(card)
    console.log(card)
  }

  removeCard (index: number): void {
    this._hand.splice(index, 1)
  }

  private readonly _hand: Card[] = []
}
const player = new Player()

const socket = io.connect('http://localhost:3000')
socket.on('initial_hand', (hand: string[]) => {
  hand.forEach(id => {
    player.addCard((cardList as unknown as { [id: string]: Card})[id])
  })
})
