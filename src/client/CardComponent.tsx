import React from 'react'

interface IProps {
  name: string
  cost?: number
  text: string
}

export const CardComponent: React.FunctionComponent<IProps> = (props: IProps) => (
  <div>
    <h1>{props.name}</h1>
    <p>{props.cost}</p>
    <p>{props.text}</p>
  </div>
)
