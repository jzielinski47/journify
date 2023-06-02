//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom'

import LoginScreen from './screens/LoginScreen/LoginScreen'
import DashboardScreen from './screens/DashboardScreen/DashboardScreen'


const App = () => {

  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [id, setID] = useState('')

  const navigate = useNavigate();

  useEffect(() => {

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(!isConnected)
    }

    ws.onmessage = ({ data }) => {

      setErrorMessage('')

      if (data.startsWith('%authorized')) {
        setID(data.split('=')[1])
        navigate("/dashboard");
      } else {
        console.log(data)
        setErrorMessage(data)
      }

    }

  }, [])

  const sendData = (message: string) => ws.send(message)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LoginScreen ws={ws} id={id} errorMessage={errorMessage} />}>
        <Route index element={<LoginScreen ws={ws} id={id} errorMessage={errorMessage} />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
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
