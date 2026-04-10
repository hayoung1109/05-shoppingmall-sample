import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  // BrowserRouter는 URL에 따라 어떤 화면을 보여줄지 관리하는 "라우팅 시스템"을 앱 전체에 제공하는 관리자
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
)
