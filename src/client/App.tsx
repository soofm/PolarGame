import React from 'react'
import { StatsPane } from './StatsPane'
import { CardPane } from './CardPane'
import { usePlayerStats, usePlayerCards } from './socket'
import './App.css'

function App (): React.ReactElement {
  const [stats] = usePlayerStats()
  const [cards, playCard] = usePlayerCards()

  return (
    <div className="container">
      <StatsPane stats={stats} />
      <CardPane cards={cards} playCard={playCard} />
    </div>
  )
}
App.displayName = 'App'
export { App }
