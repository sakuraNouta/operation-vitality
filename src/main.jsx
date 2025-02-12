import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'virtual:uno.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import 'animate.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
)
