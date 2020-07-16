import React from 'react'
import './StatsPane.css'

interface IProps {
  stats: {
    attack: number
    shields: number
  }
}

function StatsPane (props: IProps): React.ReactElement<IProps> {
  return (
    <div className="left-column">
      <div className="stats-padding">
        <div>{props.stats.attack} Attack</div>
        <div>{props.stats.shields} Shields</div>
      </div>
    </div>
  )
}
StatsPane.displayName = 'StatsPane'
export { StatsPane }
