import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Router } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import AppContextProvider from './Context/Context.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
  <ParallaxProvider>
    <App />
  </ParallaxProvider>
   </AppContextProvider>
  </BrowserRouter>
   
  
)
