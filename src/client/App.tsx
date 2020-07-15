import React from 'react'
import { Player } from './Player'
import { Card, CardList } from '../common'
import { subscribeToCards } from './socket'
import './App.css'

interface IState {
  player: {
    cards: Card[]
  }
}

export class App extends React.Component<{}, IState> {
  constructor (props: any) {
    super(props)
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
      <div className="container">
        <Player cards={this.state.player.cards} />
      </div>
    )
  }
}
