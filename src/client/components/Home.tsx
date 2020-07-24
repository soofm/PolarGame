import React, { useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'

interface IProps {
  createRoom: () => Promise<string>
}

function Home (props: IProps): React.ReactElement {
  const [redirect, setRedirect] = useState<string | undefined>()

  if (redirect != null) {
    return <Redirect to={redirect} />
  }

  async function handleSubmitCreateRoom (e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    const roomId = await props.createRoom()
    setRedirect(`/game/${roomId}`)
  }

  return (
    <div className="main-menu">
      <form onSubmit={handleSubmitCreateRoom}>
        <h1>Game Name</h1>
        <div>
          <button type="submit">Create Room</button>
        </div>
      </form>
    </div>
  )
}
Home.displayName = 'Home'
export { Home }
