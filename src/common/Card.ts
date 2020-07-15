export interface Card {
  name: string
  cost?: number
  text: string
  effect: { [id: string]: number }
}
