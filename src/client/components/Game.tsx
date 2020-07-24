import React, { useState, useEffect, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useGame } from '../socket'
import { CardList } from '@/common'
import { StatsPane } from './StatsPane'
import { CardPane } from './CardPane'
import { Lobby } from './Lobby'
import './Game.css'

function Game (): React.ReactElement {
  const { roomId } = useParams()
  const [name, setName] = useState<string | null>()
  const {
    playerId,
    gameState,
    startGame,
    playCard
  } = useGame(roomId)

  function handleSubmitJoinRoom (e: FormEvent<HTMLFormElement>, formData: string): void {
    e.preventDefault()
    window.localStorage.setItem('game_data', JSON.stringify({
      roomId,
      name: formData
    }))
    setName(formData)
  }

  useEffect(() => {
    const gameData = window.localStorage.getItem('game_data')
    if (gameData != null) {
      const { roomId: lsRoomId, name: lsName } = JSON.parse(gameData)
      if (roomId !== lsRoomId) {
        window.localStorage.removeItem('game_data')
      } else {
        setName(lsName)
      }
    }
  }, [])

  if (name == null || name === '') {
    return <Lobby onSubmit={handleSubmitJoinRoom} />
  }
  if (playerId == null || gameState.phase === 0) {
    return (
      <div className="main-menu">
        <button type="button" onClick={() => startGame(roomId)}>Start Game</button>
      </div>
    )
  }

  const playerState = gameState.playerStates.find(player => player.id === playerId)
  if (playerState == null) {
    throw new Error('Player does not exist in this game?!')
  }
  const cards = playerState.hand.map(cardId => CardList[cardId])

  return (
    <div className="container">
      <StatsPane playerName={name} playerState={playerState} />
      <CardPane cards={cards} playCard={playCard} />
    </div>
  )
}
Game.displayName = 'Game'
export { Game }
