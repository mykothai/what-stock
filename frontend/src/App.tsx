import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingDashboard from './dashboards/LandingDashboard'
import { ItemPage } from './components/Inventory/ItemPage'
import Header from './components/Header/Header'
import SidebarMenuItems from './components/Sidebar/SidebarMenuItems'
import Sidebar from './components/Sidebar/Sidebar'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<>{'Please wait...'}</>}>
        <Header />
        <Sidebar items={SidebarMenuItems()} />
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
