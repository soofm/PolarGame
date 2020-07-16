import Koa from 'koa'
import serve from 'koa-static'
import socketIO from 'socket.io'
import http from 'http'
import path from 'path'
import { SocketEvents } from '../common'
import { Player } from './Player'

const app = new Koa()
const server = http.createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises
const io = socketIO(server)

app.use(serve(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  const player = new Player()
  player.draw(5)
  socket.emit(SocketEvents.UpdatedPlayerStats, player.getStats())
  socket.on(SocketEvents.PlayedCard, (index) => {
    player.playCard(index)
    socket.emit(SocketEvents.UpdatedPlayerStats, player.getStats())
  })
})

server.listen(3000)
