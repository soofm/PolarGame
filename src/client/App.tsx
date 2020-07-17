import React from 'react'
import { useGameRoom } from './socket'
import { Game } from './components/Game'
import { Lobby } from './components/Lobby'
import './App.css'

function App (): React.ReactElement {
  const [roomId, createRoom] = useGameRoom()
  return (
    roomId != null ? <Game roomId={roomId} /> : <Lobby createRoom={createRoom} />
  )
}
App.displayName = 'App'
export { App }
