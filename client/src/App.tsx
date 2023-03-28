import { useEffect, useState } from 'react'
import './App.css'
import { client as ws } from './main'

const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {

    ws.addEventListener('open', () => {
      console.log('connected');
      setIsConnected(!isConnected)
    })
  }, [])

  const sendData = (message: string) => {
    ws.send('Hey, its me')
  }

  return (
    <div className='App'>
      {isConnected.toString()}
      <button onClick={() => sendData('kupa')}>send</button>
    </div>
  )
}

export default App
