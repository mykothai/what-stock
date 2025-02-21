import BreadcrumbWrapper from '@components/Breadcrumb/BreadcrumbWrapper'
import { AppSidebar } from '@components/Sidebar/app-sidebar'

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import { useState } from 'react'

export default function SidebarWrapper() {
  const [open, setOpen] = useState(true)

  return (
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
      </SidebarInset>
    </SidebarProvider>
  )
}
