import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import NavBar from '../Components/NavBar.jsx'
import { ThemeProvider } from "@material-tailwind/react";
import Footer from '../Components/Footer.jsx'
import { ToastProvider } from '../Components/Toast.jsx'
import ScrollToTop from '../Components/ScrollTop.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
      <ThemeProvider>
        <ToastProvider>
          <App/>
        </ToastProvider>
      </ThemeProvider> 
    <Footer/>
    
  </BrowserRouter>
)
