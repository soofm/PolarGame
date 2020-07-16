import React from 'react'
import './StatsPane.css'
import { PlayerStats } from '../common'

interface IProps {
  stats: PlayerStats
}

function StatsPane (props: IProps): React.ReactElement<IProps> {
  const { stats } = props

  return (
    <div className="left-column">
      <div className="stats-padding">
        <div>Draw Pile: {stats.drawPile.length}</div>
        <div>Discard Pile: {stats.discardPile.length}</div>
        <div>{stats.money} Minerals</div>
        <div>{stats.combat} Combat</div>
        <div>{stats.shields} Shields</div>
      </div>
    </div>
  )
}
StatsPane.displayName = 'StatsPane'
export { StatsPane }
