import { v4 as uuidv4 } from 'uuid'
import { CardList, PlayerStats } from '../common'
import { shuffle } from './utilities'

export class Player {
  get id (): string { return this._id }

  getStats (): PlayerStats {
    const drawPile = this._drawPile.slice()
    shuffle(drawPile)
    return {
      drawPile,
      discardPile: this._discardPile,
      hand: this._hand,
      money: this._money,
      combat: this._combat,
      shields: this._shields
    }
  }

  draw (value: number): void {
    let cardsLeft = value
    while (cardsLeft > 0) {
      if (this._drawPile.length === 0) {
        if (this._discardPile.length === 0) { // avoid infinite loop if discard pile is empty
          return
        }
        this._drawPile.push(...this._discardPile.splice(0, this._discardPile.length))
        shuffle(this._drawPile)
      }
      if (value > this._drawPile.length) {
        value = this._drawPile.length
      }
      this._hand.push(...this._drawPile.splice(0, value))
      cardsLeft -= value
    }
  }

  playCard (index: number): void {
    if (index >= this._hand.length) {
      return
    }
    const [cardId] = this._hand.splice(index, 1)
    const card = CardList[cardId]
    card.effects.forEach(({ key, value }) => {
      switch (key) {
        case 'inc_money':
          this._money += value
          break
        case 'inc_combat':
          this._combat += value
          break
        case 'inc_shields':
          this._shields += value
          break
        default:
          break
      }
    })
    this._discardPile.push(cardId)
  }

  constructor () {
    this._id = uuidv4()
    this._drawPile = Array.from({ length: 10 }).map((_, i) => i < 8 ? 'mining_drone' : 'scout')
    shuffle(this._drawPile)
    this._discardPile = []
    this._hand = []
    this._shields = 20
    this._money = 0
    this._combat = 0
  }

  private readonly _id: string
  private readonly _drawPile: string[]
  private readonly _discardPile: string[]
  private readonly _hand: string[]
  private _shields: number
  private _money: number
  private _combat: number
}
