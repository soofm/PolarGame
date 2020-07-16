import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Card, CardList, PlayerStats, SocketEvents } from '../common'

const socket = io()

function usePlayer (): [PlayerStats, Card[], (index: number) => void] {
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    drawPile: [],
    discardPile: [],
    hand: [],
    shields: 20,
    money: 0,
    combat: 0
  })
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    socket.on(SocketEvents.UpdatedPlayerStats, (stats: PlayerStats) => {
      setPlayerStats(stats)
      setCards(stats.hand.map(cardId => CardList[cardId]))
    })
  })

  function playCard (index: number): void {
    if (index >= cards.length) {
      return
    }
    setCards(cards.filter((_, i) => i !== index))
    socket.emit(SocketEvents.PlayedCard, index)
  }

  return [playerStats, cards, playCard]
}

export { usePlayer }
