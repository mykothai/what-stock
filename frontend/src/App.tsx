import React from 'react'
import './App.css'
import StoreInventory from "./components/StoreInventory"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* TODO: make a landing page */}
        <Route path='/' element={<StoreInventory/>}/>
        <Route path='/inventories' element={<StoreInventory/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
