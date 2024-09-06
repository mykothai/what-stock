import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingDashboard from './dashboards/LandingDashboard'
import LeftSideBar from './components/SideBar/LeftSideBar'
import { ItemPage } from './components/Inventory/ItemPage'
import Header from './components/Header/Header'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Please wait...</div>}>
        <Header />
        <LeftSideBar>
          <Routes>
            <>
              <Route
                path="/"
                element={
                  <>
                    <LandingDashboard />
                  </>
                }></Route>
              <Route
                path="/item/:itemId"
                element={
                  <>
                    <ItemPage />
                  </>
                }></Route>
            </>
          </Routes>
        </LeftSideBar>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
