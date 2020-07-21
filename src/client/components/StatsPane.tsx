import React from 'react'
import { PlayerState } from '@/common'

interface IProps {
  playerState: PlayerState
}

function StatsPane (props: IProps): React.ReactElement<IProps> {
  const { playerState } = props

  return (
    <div className="left-column">
      <div className="stats-padding">
        <div>Draw Pile: {playerState.drawPile.length}</div>
        <div>Discard Pile: {playerState.discardPile.length}</div>
        <div>{playerState.money} Minerals</div>
        <div>{playerState.combat} Combat</div>
        <div>{playerState.shields} Shields</div>
      </div>
    </div>
  )
}
StatsPane.displayName = 'StatsPane'
export { StatsPane }
