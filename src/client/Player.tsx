import React from 'react'
import { CardComponent } from './CardComponent'
import { Card } from '../common/Card'

interface IProps {
  cards: Card[]
}

export const Player: React.FunctionComponent<IProps> = (props: IProps) => (
  <div>
    {
      props.cards.map((card, index) => (
        <CardComponent
          key={index}
          name={card.name}
          cost={card.cost}
          text={card.text}
        />
      ))
    }
  </div>
)
