import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProSidebarProvider } from 'react-pro-sidebar';
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
              <ProSidebarProvider>
                  <App/>
              </ProSidebarProvider>
  </React.StrictMode>
)
