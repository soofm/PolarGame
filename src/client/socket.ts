import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')

function subscribeToCards (cb: (err: Error, cardIds: string[]) => void): void {
  socket.on('initial_hand', (cardIds: string[]) => cb(null, cardIds))
}

export { subscribeToCards }
