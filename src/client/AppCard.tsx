import React from 'react'
import './AppCard.css'

interface IProps {
  name: string
  cost?: number
  text: string
}

export const CardComponent: React.FunctionComponent<IProps> = (props: IProps) => (
  <div className="card">
    <div>
      <h3>{props.name}</h3>
      {props.cost != null ? <div className="card-cost">{props.cost.toString()}</div> : null}
    </div>
    <p>{props.text}</p>
  </div>
)
