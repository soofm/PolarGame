import Koa from 'koa'
import serve from 'koa-static'
import socketIO from 'socket.io'
import http from 'http'
import path from 'path'
import { CardList, SocketEvents } from '../common'
import { initPlayer } from './initPlayer'

const app = new Koa()
const server = http.createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises
const io = socketIO(server)

app.use(serve(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
  const player = initPlayer()
  socket.emit(SocketEvents.DrewCards, player.hand)
  socket.on(SocketEvents.PlayedCard, (index) => {
    if (index >= player.hand.length) {
      return
    }
    const [cardId] = player.hand.splice(index, 1)
    const card = CardList[cardId]
    card.effects.forEach(({ id, value }) => {
      switch (id) {
        case 'inc_attack':
          player.stats.attack += Number(value)
          break
        case 'inc_shields':
          player.stats.shields += Number(value)
          break
        default:
          break
      }
    })
    socket.emit(SocketEvents.UpdatedStats, player.stats)
  })
})

server.listen(3000)
