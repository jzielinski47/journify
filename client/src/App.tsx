//@ts-nocheck

import { useEffect, useState } from 'react'
import './App.css'
import { client as ws } from './main'

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
      <button onClick={() => sendData('kupa')}>send</button>
    </div>
  )
}

export default App
