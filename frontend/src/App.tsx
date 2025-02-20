import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingDashboard from './components/Dashboards/LandingDashboard'
import { ItemPage } from './components/Inventory/ItemPage'
import SidebarWrapper from '@components/Sidebar/SidebarWrapper'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<>{'Please wait...'}</>}>
        <SidebarWrapper />
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
