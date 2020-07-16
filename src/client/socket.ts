import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Card, CardList, Stats, SocketEvents } from '../common'

const socket = io()

function usePlayerStats (): [Stats] {
  const [stats, setStats] = useState<Stats>({
    attack: 0,
    shields: 0
  })

  useEffect(() => {
    socket.on(SocketEvents.UpdatedStats, (stats: Stats) => {
      setStats(stats)
    })
  })

  return [stats]
}

function usePlayerCards (): [Card[], (index: number) => void] {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    socket.on(SocketEvents.DrewCards, (cardIds: string[]) => {
      setCards([...cards, ...cardIds.map(cardId => CardList[cardId])])
    })
  })

  function playCard (index: number): void {
    if (index >= cards.length) {
      return
    }
    setCards(cards.filter((_, i) => i !== index))
    socket.emit(SocketEvents.PlayedCard, index)
  }

  return [cards, playCard]
}

export { usePlayerStats, usePlayerCards }
