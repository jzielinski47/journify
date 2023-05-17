//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

const App = () => {
  const [isConnected, setIsConnected] = useState(false)

  const [login, setLogin] = useState('');
  const [passwd, setPasswd] = useState('');

  const [id, setID] = useState('')

  useEffect(() => {

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(!isConnected)
    }

    ws.onmessage = ({ data }) => {

      if (data.startsWith('%authorized')) {
        setID(data.split('=')[1])
      } else {
        console.log(data)
      }

    }

  }, [])

  const sendData = (message: string) => {
    ws.send(message)
  }

  const sendLoginData = () => ws.send(`%login&login=${login}&passwd=${passwd}`)

  const sendRegisterData = () => ws.send(`%register&login=${login}&passwd=${passwd}`)

  return (
    <div className='App'>

      {id}



      <div className='loginForm'>
        <h2>Sign in</h2>
        <p>Connect your Journify account.<br />Don't have an account? <span className='fake-link'>Sign up!</span></p>

        <span className='label'>Username</span>
        <input type='text' onChange={(e) => setLogin(e.target.value)} placeholder='Login' />
        <span className='label'>Password</span>
        <input type='password' onChange={(e) => setPasswd(e.target.value)} placeholder='Password' />
        <button className='btn-hmp' onClick={() => sendLoginData()}>Login</button>
        <button className='btn-mmp' onClick={() => sendRegisterData()}>Register</button>
      </div>


    </div>
  )
}

export default App
