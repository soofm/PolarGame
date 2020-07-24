import React from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import { Game } from './components/Game'
import { Home } from './components/Home'
import { createRoom } from './api'
import './App.css'

function App (): React.ReactElement {
  return (
    <HashRouter>
      <Switch>
        <Route path="/game/:roomId">
          <Game />
        </Route>
        <Route path="/">
          <Home createRoom={createRoom} />
        </Route>
      </Switch>
    </HashRouter>
  )
}
App.displayName = 'App'
export { App }
