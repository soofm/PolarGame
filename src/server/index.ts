import Koa from 'koa'
import serve from 'koa-static'
import { createServer } from 'http'
import path from 'path'
import { setupSocket } from './socket'

const app = new Koa()
const server = createServer(app.callback()) // eslint-disable-line @typescript-eslint/no-misused-promises

app.use(serve(path.join(__dirname, 'public')))

setupSocket(server)

server.listen(3000)
