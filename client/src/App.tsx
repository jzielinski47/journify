import { useEffect, useState } from 'react'
import './App.css'
import { client } from './main'

const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {

    client.addEventListener('open', () => {
      console.log('connected');
      setIsConnected(!isConnected)
    })
  }, [])

  return (
    <div className='App'>
      {isConnected.toString()}
    </div>
  )
}

export default App
