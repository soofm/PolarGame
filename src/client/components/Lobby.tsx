import React, { useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import './Lobby.css'

interface IProps {
  createRoom: (name: string) => Promise<string>
}

function Lobby (props: IProps): React.ReactElement {
  const [name, setName] = useState<string>('')
  const [redirect, setRedirect] = useState<string | undefined>()

  async function handleSubmitCreateRoom (e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    const roomId = await props.createRoom(name)
    setRedirect(`/game/${roomId}`)
  }

  if (redirect != null) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="lobby-menu">
      <form onSubmit={handleSubmitCreateRoom}>
        <h2>Create New Room</h2>
        <label>
          Nickname:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div>
          <button type="submit">Create Room</button>
        </div>
      </form>
    </div>
  )
}
Lobby.displayName = 'Lobby'
export { Lobby }
