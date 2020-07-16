import React from 'react'
import { StatsPane } from './StatsPane'
import { CardPane } from './CardPane'
import { usePlayer } from './socket'
import './App.css'

function App (): React.ReactElement {
  const [stats, cards, playCard] = usePlayer()

  return (
    <div className="container">
      <StatsPane stats={stats} />
      <CardPane cards={cards} playCard={playCard} />
    </div>
  )
}
App.displayName = 'App'
export { App }
