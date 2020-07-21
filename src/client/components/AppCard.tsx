import React from 'react'
import './AppCard.css'

interface IProps {
  name: string
  cost?: number
  text: string
  handlePlayCard: React.MouseEventHandler
}

function AppCard (props: IProps): React.ReactElement<IProps> {
  const replacements = [
    [':mineral:', '💎'],
    [':gun:', '🔫']
  ]

  function parseText (text: string): string {
    let copy = text
    replacements.forEach(([pattern, replacement]) => {
      copy = copy.replace(pattern, replacement)
    })
    return copy
  }

  return (
    <div className="card" onClick={props.handlePlayCard}>
      <div>
        <h3>{props.name}</h3>
        {props.cost != null ? <div className="card-cost">{props.cost.toString()}</div> : null}
      </div>
      <p>{parseText(props.text)}</p>
    </div>
  )
}
AppCard.displayName = 'AppCard'
export { AppCard }
