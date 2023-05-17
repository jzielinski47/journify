//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  const [login, setLogin] = useState('');
  const [passwd, setPasswd] = useState('');

  useEffect(() => {

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(!isConnected)
    }

    ws.onmessage = ({ data }) => { console.log(data) }

  }, [])

  const sendData = (message: string) => {
    ws.send(message)
  }

  const sendLoginData = () => ws.send(`%login&login=${login}&passwd=${passwd}`)

  const sendRegisterData = () => ws.send(`%register&login=${login}&passwd=${passwd}`)

  return (
    <div className='App'>

      <div className='loginForm'>
        <input type='text' onChange={(e) => setLogin(e.target.value)} />
        <input type='password' onChange={(e) => setPasswd(e.target.value)} />
        <button onClick={() => sendLoginData()}>login</button>
        <button onClick={() => sendRegisterData()}>register</button>
      </div>


    </div>
  )
}

export default App
