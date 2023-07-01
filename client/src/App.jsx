import { useEffect, useState } from 'react'
import { client as ws } from '.'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import LoginScreen from './screens/LoginScreen/LoginScreen'
import DashboardScreen from './screens/DashboardScreen/DashboardScreen'

import { Provider } from 'react-redux'
import { store } from './store'

const App = () => {

  // web socket related states
  const [isConnected, setIsConnected] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [id, setID] = useState(null)

  const [garage, setGarage] = useState([])

  useEffect(() => {

    ws.onopen = () => {
      console.log('connected');
      setIsConnected(!isConnected)
    }

    ws.onmessage = ({ data }) => {

      setErrorMessage('')

      console.log(data)

      if (typeof data === 'string') {
        if (data.startsWith('%authorized')) {
          setID(data.split('=')[1])
        } else if (data.startsWith('%garage')) {
          setGarage(JSON.parse(data.split('=')[1]))
        } else {
          setErrorMessage(data)
        }
      }

    }

  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<LoginScreen id={id} errorMessage={errorMessage} />} />
        <Route path='/dashboard' element={<DashboardScreen garage={garage} />} />
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
