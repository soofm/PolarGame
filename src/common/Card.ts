import { KeyValue } from './KeyValue'

export interface Card {
  id: string
  name: string
  text: string
  effects: KeyValue[]
  cost?: number
  additional_cost?: KeyValue[]
  points?: number
}
