//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

import LoginScreen from './screens/LoginScreen/LoginScreen'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [id, setID] = useState('')

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
      <LoginScreen ws={ws} errorMessage={errorMessage} id={id} />
    </div>
  )
}

export default App
