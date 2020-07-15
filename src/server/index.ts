import * as Koa from 'koa'
import * as socketIO from 'socket.io'
import * as http from 'http'

const app = new Koa()
const server = http.createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises
const io = socketIO(server)

app.use(async ctx => {
  ctx.body = 'Hello World'
})

const hand: string[] = []
Array.from({ length: 6 }).forEach((_, i) => hand.push(i < 4 ? 'blaster' : 'shields'))

io.on('connection', (socket) => {
  socket.emit('initial_hand', hand)
  socket.on('card_played', (card) => {
    console.log(JSON.stringify(card))
  })
})

server.listen(3000)
