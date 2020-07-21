import Koa from 'koa'
import serve from 'koa-static'
import Router from '@koa/router'
import { createServer } from 'http'
import path from 'path'
import { createGame, setupSocket } from './socket'

const app = new Koa()
const router = new Router()
const server = createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises

router.get('/createGame', (ctx) => {
  const roomId = createGame()
  ctx.body = roomId
})

app.use(router.routes()).use(router.allowedMethods())
app.use(serve(path.join(__dirname, 'public')))

setupSocket(server)

server.listen(3000)
