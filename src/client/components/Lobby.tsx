import React, { useState, FormEvent } from 'react'

interface IProps {
  onSubmit: (e: FormEvent<HTMLFormElement>, formData: string) => void
}

function Lobby (props: IProps): React.ReactElement {
  const [name, setName] = useState<string>('')

  return (
    <div className="main-menu">
      <form onSubmit={(e) => props.onSubmit(e, name)}>
        <label htmlFor="player-name">Nickname:</label>
        <input id="player-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <div>
          <button type="submit">Join Room</button>
        </div>
      </form>
    </div>
  )
}
Lobby.displayName = 'Lobby'
export { Lobby }
