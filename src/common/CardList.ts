import { Card } from './Card'

const CardList: { [id: string]: Card } = {
  blaster: {
    id: 'blaster',
    name: 'Blaster',
    text: ':attack:',
    effects: [
      { id: 'inc_attack', value: 1 }
    ]
  },
  shields: {
    id: 'shields',
    name: 'Shields',
    text: ':shield:',
    effects: [
      { id: 'inc_shields', value: 1 }
    ]
  },
  plasma_blaster: {
    id: 'plasma_blaster',
    name: 'Plasma Blaster',
    cost: 3,
    text: ':attack: :attack:',
    effects: [
      { id: 'inc_attack', value: 2 }
    ]
  },
  phase_shielding: {
    id: 'phase_shielding',
    name: 'Phase Shielding',
    cost: 3,
    text: '2 :shield:',
    effects: [
      { id: 'inc_shields', value: 2 }
    ]
  },
  evasive_maneuvers: {
    id: 'evasive_maneuvers',
    name: 'Evasive Maneuvers',
    cost: 5,
    text: '4 :shield:',
    effects: [
      { id: 'discard_chosen', value: 1 },
      { id: 'inc_shields', value: 4 }
    ]
  },
  rapid_prototyping: {
    id: 'rapid_prototyping',
    name: 'Rapid Prototyping',
    cost: 7,
    text: 'You may scrap a card. If you do, add an equipment card from the Exchange to your discard pile.',
    effects: [
      { id: 'scrap_chosen_to_acquire', value: 1 }
    ]
  }
}
export { CardList }
