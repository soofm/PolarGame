import { Server as HttpServer } from 'http'
import socketIO from 'socket.io'
import { ClientEvents, ServerEvents } from '@/common'
import { Game } from './Game'

const games: Game[] = []

export function createGame (): string {
  // todo: auth
  const game = new Game()
  games.push(game)
  return game.roomId
}

export function setupSocket (server: HttpServer): void {
  const io = socketIO(server)

  io.on('connection', (socket) => {
    socket.on(ClientEvents.JoinRoom, (roomId: string) => {
      const game = games.find(room => room.roomId === roomId)
      if (game == null) {
        return
      }
      const { id: playerId } = game.addPlayer()
      socket.emit(ServerEvents.JoinedRoom, playerId)
      socket.join(roomId)
      const state = game.getState()
      socket.emit(ServerEvents.UpdatedGameState, state)
      socket.to(roomId).emit(ServerEvents.UpdatedGameState, state)
    })

    socket.on(ClientEvents.LeaveRoom, (roomId: string, playerId: string) => {
      const game = games.find(room => room.roomId === roomId)
      if (game == null) {
        return
      }
      game.removePlayer(playerId)
      socket.leave(roomId)
      socket.emit(ServerEvents.LeftRoom, [roomId, playerId])
      const state = game.getState()
      socket.to(roomId).emit(ServerEvents.UpdatedGameState, state)
    })

    socket.on(ClientEvents.StartGame, (roomId: string) => {
      const game = games.find(room => room.roomId === roomId)
      if (game == null) {
        return
      }
      game.start()
      const state = game.getState()
      socket.emit(ServerEvents.UpdatedGameState, state)
      socket.to(roomId).emit(ServerEvents.UpdatedGameState, state)
    })

    socket.on(ClientEvents.PlayCard, (roomId: string, playerId: string, index: number) => { // todo: add cookie with JWT and extract roomId and playerId
      const game = games.find(room => room.roomId === roomId)
      if (game == null) {
        return
      }
      const player = game.getPlayer(playerId)
      if (player == null) {
        return
      }
      player.playCard(index)
      const state = game.getState()
      socket.emit(ServerEvents.UpdatedGameState, state)
      socket.to(roomId).emit(ServerEvents.UpdatedGameState, state)
    })
  })
}
