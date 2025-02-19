import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingDashboard from './components/Dashboards/LandingDashboard'
import { ItemPage } from './components/Inventory/ItemPage'
import { SidebarProvider } from '@components/ui/sidebar'
import { AppSidebar } from '@components/app-sidebar'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<>{'Please wait...'}</>}>
        <SidebarProvider>
          <AppSidebar variant="floating" collapsible="icon" />
        </SidebarProvider>
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
