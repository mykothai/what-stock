import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store/reducers'

const root = createRoot(document.getElementById('root') as HTMLElement)

const store = configureStore({ reducer: rootReducer })

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

reportWebVitals()
