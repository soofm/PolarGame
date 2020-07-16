import { Card } from './Card'

const CardList: { [id: string]: Card } = {
  mining_drone: {
    id: 'mining_drone',
    name: 'Mining Drone',
    text: ':mineral:',
    effects: [
      { key: 'inc_money', value: 1 }
    ]
  },
  scout: {
    id: 'scout',
    name: 'Scout',
    text: ':gun:',
    effects: [
      { key: 'inc_combat', value: 1 }
    ]
  },
  trade_vessel: {
    id: 'trade_vessel',
    name: 'Trade Vessel',
    text: '2:mineral:',
    effects: [
      { key: 'inc_money', value: 2 }
    ],
    cost: 3
  },
  cyclone: {
    id: 'cyclone',
    name: 'Cyclone',
    text: '2:gun:',
    effects: [
      { key: 'inc_combat', value: 2 }
    ],
    cost: 3
  },
  rapid_prototyping: {
    id: 'rapid_prototyping',
    name: 'Rapid Prototyping',
    cost: 7,
    text: 'You may scrap a card. If you do, add an equipment card from the Exchange to your discard pile.',
    effects: [
      { key: 'scrap_chosen_to_acquire', value: 1 }
    ]
  }
}
export { CardList }
