import { Effect } from './Effect'

export interface Card {
  id: string
  name: string
  cost?: number
  text: string
  effects: Effect[]
}
