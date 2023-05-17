//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const App = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isPasswordShown, setIsPasswordShown] = useState(false)

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

      <div className='loginForm'>
        <FontAwesomeIcon icon="fa-solid fa-car-burst" bounce size='2xl' style={{ color: "#ffffff" }} onClick={() => setIsPasswordShown(!isPasswordShown)} />
        <h2>Sign in</h2>
        <p>Connect your Journify account.<br />Don't have an account? <span className='fake-link'>Sign up!</span></p>
        <p> {id}</p>

        <span className='label'>Username</span>
        <input type='text' onChange={(e) => setLogin(e.target.value)} placeholder='Login' />
        <span className='label'>Password</span>
        <input type={isPasswordShown ? 'text' : 'password'} onChange={(e) => setPasswd(e.target.value)} placeholder='Password' />
        <button className='btn-hmp' onClick={() => sendLoginData()}>Login</button>
        <button className='btn-mmp' onClick={() => sendRegisterData()}>Sign up</button>
      </div>


    </div>
  )
}

export default App
