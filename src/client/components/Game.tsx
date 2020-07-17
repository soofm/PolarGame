import React from 'react'
import { StatsPane } from './StatsPane'
import { CardPane } from './CardPane'
import { usePlayer } from '../socket'

interface IProps {
  roomId: string
}

function Game (_props: IProps): React.ReactElement {
  const [stats, cards, playCard] = usePlayer()

  return (
    <div className="container">
      <StatsPane stats={stats} />
      <CardPane cards={cards} playCard={playCard} />
    </div>
  )
}
Game.displayName = 'Game'
export { Game }
