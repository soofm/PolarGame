import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Card, CardList, PlayerStats, ClientEvents, ServerEvents } from '../common'

const socket = io()

function useGameRoom (): [string | null, (name: string) => void, (roomId: string) => void] {
  const [roomId, setRoomId] = useState<string | null>(null)

  useEffect(() => {
    socket.on(ServerEvents.JoinedRoom, (roomId: string) => {
      setRoomId(roomId)
    })
  })

  function createRoom (name: string): void {
    if (name == null) {
      return
    }
    socket.emit(ClientEvents.CreateRoom, name)
  }

  function joinRoom (name: string): void {
    socket.emit(ClientEvents.JoinRoom, name)
  }

  return [roomId, createRoom, joinRoom]
}

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
    socket.on(ServerEvents.UpdatedPlayerStats, (stats: PlayerStats) => {
      setPlayerStats(stats)
      setCards(stats.hand.map(cardId => CardList[cardId]))
    })
  })

  function playCard (index: number): void {
    if (index >= cards.length) {
      return
    }
    setCards(cards.filter((_, i) => i !== index))
    socket.emit(ClientEvents.PlayCard, index)
  }

  return [playerStats, cards, playCard]
}

export { useGameRoom, usePlayer }
