import React from 'react'
import { Link } from 'react-router-dom'

function Home (): React.ReactElement {
  return (
    <button type="button">
      <Link to="/new">Create Game</Link>
    </button>
  )
}
Home.displayName = 'Home'
export { Home }
