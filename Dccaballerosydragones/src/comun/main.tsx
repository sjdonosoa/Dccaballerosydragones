import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import Routing from './routing'

createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
)
