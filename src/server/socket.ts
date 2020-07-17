import { Server as HttpServer } from 'http'
import socketIO from 'socket.io'
import { ClientEvents, ServerEvents } from '@/common'
import { Room } from './Room'

const rooms: Room[] = []

export function setupSocket (server: HttpServer): void {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    socket.on(ClientEvents.CreateRoom, (name: string) => {
      // todo: auth
      const room = new Room(name)
      const player = room.addPlayer()
      rooms.push(room)
      socket.emit(ServerEvents.JoinedRoom, room.id)
      socket.emit(ServerEvents.UpdatedPlayerStats, player?.getStats()) // todo: don't immediately start game
    })

    socket.on(ClientEvents.JoinRoom, (name: string) => {
      const room = rooms.find(room => room.name === name)
      if (room != null) {
        const player = room.addPlayer()
        if (player != null) {
          socket.emit(ServerEvents.JoinedRoom, room.id)
          socket.emit(ServerEvents.UpdatedPlayerStats, player.getStats()) // todo: don't immediately start game
        }
      }
    })

    socket.on(ClientEvents.PlayCard, (roomId, playerId, index) => { // todo: add cookie with JWT and extract roomId and playerId
      const player = rooms[roomId].getPlayer(playerId)
      if (player != null) {
        player.playCard(index)
        socket.emit(ServerEvents.UpdatedPlayerStats, player.getStats())
      }
    })
  })
}
