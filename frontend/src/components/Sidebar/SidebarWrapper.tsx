import { cn } from '@components/lib/utils'
import { AppSidebar } from '@components/Sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@components/ui/sidebar'
import { useState } from 'react'

export default function SidebarWrapper() {
  const [open, setOpen] = useState(true)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <div className="relative">
        <AppSidebar variant="floating" collapsible="icon" />
        <SidebarTrigger
          className={`absolute top-4 ${
            open ? 'right-[-14rem]' : 'right-[-2rem]'
          }`}
        />
      </div>
    </SidebarProvider>
  )
}
