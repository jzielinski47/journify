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
      setIsConnected(true);
    };

    ws.onerror = (error) => {
      console.log('WebSocket Error: ', error);
      // Handle the error
    };

    ws.onmessage = ({ data }) => {

      setErrorMessage('')

      if (typeof data === 'string') {
        if (data.startsWith('%authorized')) {
          setID(data.split('=')[1])
        } else if (data.startsWith('%garage')) {
          setGarage(JSON.parse(data.split('=')[1]))
        } else if (data.startsWith('%loggedOut')) {
          // Reset state upon logout confirmation from server
          setID(null);
          setGarage([]);
          // Additional state reset if needed
        } else {
          setErrorMessage(data)
        }
      }

    }

    // Cleanup function
    return () => {
      ws.onopen = null;
      ws.onclose = null;
      ws.onerror = null;
      ws.onmessage = null;
    };

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
