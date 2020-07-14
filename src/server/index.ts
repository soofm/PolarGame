import * as Koa from 'koa'
import * as socketIO from 'socket.io'
import * as http from 'http'

const app = new Koa()
const server = http.createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises
const io = socketIO(server)

app.use(async ctx => {
  ctx.body = 'Hello World'
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3000)
