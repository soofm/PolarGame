import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { ClientEvents, ServerEvents, GameState } from '../common'

const socket = io()

interface GameHook {
  playerId: string | undefined
  gameState: GameState
  startGame: (roomId: string) => void
  playCard: (index: number) => void
}

function useGame (roomId: string): GameHook {
  const [playerId, setPlayerId] = useState<string | undefined>()
  const [gameState, setGameState] = useState<GameState>({
    phase: 0,
    playerStates: []
  })

  useEffect(() => {
    socket.on(ServerEvents.JoinedRoom, (playerId: string) => {
      setPlayerId(playerId)
    })
    socket.on(ServerEvents.UpdatedGameState, (state: GameState) => {
      setGameState(state)
    })
    socket.emit(ClientEvents.JoinRoom, roomId)
  }, [])

  function startGame (): void {
    socket.emit(ClientEvents.StartGame, roomId)
  }

  function playCard (index: number): void {
    const playerState = gameState.playerStates.find(player => player.id === playerId)
    if (playerState == null || index >= playerState.hand.length) {
      return
    }
    socket.emit(ClientEvents.PlayCard, roomId, playerId, index)
  }

  return { playerId, gameState, startGame, playCard }
}

export { useGame }
