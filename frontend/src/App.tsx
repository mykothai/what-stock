import React, { Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingDashboard from './components/Dashboards/LandingDashboard'
import { ItemPage } from './components/Inventory/ItemPage'
import BreadcrumbWrapper from '@components/Breadcrumb/BreadcrumbWrapper'
import { AppSidebar } from '@components/Sidebar/app-sidebar'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'

function App() {
  const [open, setOpen] = useState(true)

  return (
    <BrowserRouter>
      <Suspense fallback={<>{'Please wait...'}</>}>
        <SidebarProvider open={open} onOpenChange={setOpen}>
          <AppSidebar collapsible="icon" />
          <SidebarInset
            className={`flex gap-2 px-2 bg-green-100  ${
              open ? 'right-[-11rem]' : 'right-[-3.5rem]'
            }`}>
            <header className="flex h-16 items-center gap-2 border-b">
              <div className="flex gap-2 justify-start w-full">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbWrapper />
              </div>
            </header>
            <Routes>
              <Route path="/" element={<LandingDashboard />}></Route>
              <Route path="/item/:itemId" element={<ItemPage />}></Route>
            </Routes>
          </SidebarInset>
        </SidebarProvider>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
