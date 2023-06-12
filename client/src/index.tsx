import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//@ts-ignore
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { CustomProvider } from 'rsuite';
export const client = new W3CWebSocket('ws://127.0.0.1:8000');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CustomProvider theme='dark'>
      <App />
    </CustomProvider>
  </React.StrictMode>,
)
