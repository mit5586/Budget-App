import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BudgetProvider} from './contexts/BudgetContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BudgetProvider>
    <App />
    </BudgetProvider>
  </React.StrictMode>,
)
