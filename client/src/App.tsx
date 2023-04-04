//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(!isConnected)
    }

    ws.onmessage = ({ data }) => { console.log(data) }

  }, [])

  const sendData = (message: string) => {
    ws.send('new client login')
  }

  return (
    <div className='App'>
      {isConnected.toString()}
      <input />
      <input />
      <button onClick={() => sendData('kupa')}>send</button>
    </div>
  )
}

export default App
