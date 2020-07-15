import React from 'react'
import { Player } from './Player'
import { Card, CardList } from '../common'
import { subscribeToCards } from './socket'

interface IState {
  player: {
    cards: Card[]
  }
}

export class App extends React.Component<{}, IState> {
  constructor () {
    super({})
    this.state = {
      player: {
        cards: []
      }
    }

    subscribeToCards((err: Error, cardIds: string[]) => {
      if (err != null) {
        return
      }
      const cards: Card[] = []
      cardIds.forEach(cardId => {
        cards.push(CardList[cardId])
      })
      this.setState({ player: { cards } })
    })
  }

  render (): React.ReactNode {
    return (
      <div>
        <Player cards={this.state.player.cards} />
      </div>
    )
  }
}
