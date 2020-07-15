import Koa from 'koa'
import serve from 'koa-static'
import socketIO from 'socket.io'
import http from 'http'
import path from 'path'

const app = new Koa()
const server = http.createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises
const io = socketIO(server)

app.use(serve(path.join(__dirname, 'public')))

const hand: string[] = []
Array.from({ length: 6 }).forEach((_, i) => hand.push(i < 4 ? 'blaster' : 'shields'))

io.on('connection', (socket) => {
  socket.emit('initial_hand', hand)
  socket.on('card_played', (card) => {
    console.log(JSON.stringify(card))
  })
})

server.listen(3000)
