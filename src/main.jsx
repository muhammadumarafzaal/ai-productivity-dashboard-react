import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { TaskProvider } from './context/TaskContext'
import { HabitProvider } from './context/HabitContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <HabitProvider>
          <App />
        </HabitProvider>
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
