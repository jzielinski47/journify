//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'
import LoginPanel from './components/LoginPanel/LoginPanel'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(!isConnected)
    }

    ws.onmessage = ({ data }) => {

      setErrorMessage('')

      if (data.startsWith('%authorized')) {
        setID(data.split('=')[1])
      } else {
        console.log(data)
        setErrorMessage(data)
      }

    }

  }, [])

  const sendData = (message: string) => ws.send(message)

  return (
    <div className='App'>

      <LoginPanel ws={ws} errorMessage={errorMessage} />

    </div>
  )
}

export default App
