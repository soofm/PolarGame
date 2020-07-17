import React, { useState, FormEvent } from 'react'

interface IProps {
  createRoom: (name: string) => void
}

function Lobby (props: IProps): React.ReactElement {
  const [name, setName] = useState<string>('')

  function handleSubmitCreateRoom (e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    props.createRoom(name)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmitCreateRoom}>
        <h2>Create New Room</h2>
        <label>
          Name:
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
