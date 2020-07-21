import React from 'react'
import { useParams } from 'react-router-dom'
import { StatsPane } from './StatsPane'
import { CardPane } from './CardPane'
import { useGame } from '../socket'
import { CardList } from '@/common'
import './Game.css'

function Game (): React.ReactElement {
  const { roomId } = useParams()
  const {
    playerId,
    gameState,
    startGame,
    playCard
  } = useGame(roomId)

  if (playerId == null || gameState.phase === 0) {
    return (
      <div>
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
      <StatsPane playerState={playerState} />
      <CardPane cards={cards} playCard={playCard} />
    </div>
  )
}
Game.displayName = 'Game'
export { Game }
