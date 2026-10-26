import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { SiteProvider } from './context/Site'
import { ThemeProvider } from './context/Theme'
import { AuthProvider } from './context/Auth'
import { ActivityProvider } from './context/Activity'
import { StoreProvider } from './context/Store'
createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter><ThemeProvider><AuthProvider><ActivityProvider><StoreProvider><SiteProvider><App /></SiteProvider></StoreProvider></ActivityProvider></AuthProvider></ThemeProvider></BrowserRouter></React.StrictMode>)
