async function createRoom (): Promise<string> {
  const response = await fetch('/createGame')
  if (response.ok) {
    return await response.text()
  }
  throw new Error(`Error creating room: ${response.status}`)
}
export { createRoom }
