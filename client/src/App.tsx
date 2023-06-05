//@ts-nocheck

import { useEffect, useState } from 'react'
import { client as ws } from '.'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import LoginScreen from './screens/LoginScreen/LoginScreen'
import DashboardScreen from './screens/DashboardScreen/DashboardScreen'

import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store'
import { setWS } from './slices/wsSlice'

const App = () => {

  const dispatch = useDispatch();

  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [id, setID] = useState(null)

  useEffect(() => {

    dispatch(setWS({ webSocket: ws }))

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
        <Route index element={<LoginScreen id={id} errorMessage={errorMessage} />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
      </Route >
    )
  )

  return (
    <div className='App'>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>

    </div>
  )
}

export default App
