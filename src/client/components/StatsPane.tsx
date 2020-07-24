import React from 'react'
import { PlayerState } from '@/common'

interface IProps {
  playerName: string
  playerState: PlayerState
}

function StatsPane (props: IProps): React.ReactElement<IProps> {
  const { playerName, playerState } = props

  return (
    <div className="left-column">
      <div className="stats-padding">
        <div>Name: {playerName}</div>
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
