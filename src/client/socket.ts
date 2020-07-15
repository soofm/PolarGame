import io from 'socket.io-client'

const socket = io()

function subscribeToCards (cb: (err: Error, cardIds: string[]) => void): void {
  socket.on('initial_hand', (cardIds: string[]) => cb(null, cardIds))
}

export { subscribeToCards }
