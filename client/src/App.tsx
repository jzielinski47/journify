//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import LoginScreen from './screens/LoginScreen/LoginScreen'
import DashboardScreen from './screens/DashboardScreen/DashboardScreen'

const App = () => {

  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [id, setID] = useState(null)

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<LoginScreen id={id} ws={ws} errorMessage={errorMessage} />} />
        <Route path='/dashboard' element={<DashboardScreen id={id} />} />
      </Route >
    )
  )

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
