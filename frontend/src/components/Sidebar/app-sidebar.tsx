import * as React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@components/ui/sidebar'
import { ChevronUp, House, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModeToggle } from '@components/mode-toggle'
import {
  ChildSidebarItem,
  ParentSidebarItem,
  sidebarNavItems,
} from './sidebar-items'

const renderSidebarItems = (items: ChildSidebarItem[]) => {
  const location = useLocation()
  const navigate = useNavigate()

  return items.map((item: ChildSidebarItem) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={item.isActive}>
        <a href={item.url} className="flex items-center gap-2">
          {item.icon}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      {/* Recursively render nested items */}
      {item.items &&
        item.items.map((subItem) => (
          <SidebarMenuSub>
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton
                asChild
                isActive={subItem.isActive}
                onClick={() => navigate(subItem.url!)}
                className="flex items-center gap-2 cursor-pointer hover:cursor-pointer">
                <div>
                  {subItem.icon}
                  <span>{subItem.title}</span>
                </div>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        ))}
    </SidebarMenuItem>
  ))
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          className="cursor-pointer hover:cursor-pointer"
          onClick={() => navigate('/')}>
          <House /> What the Stock?
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {sidebarNavItems.navMain.map((group: ParentSidebarItem) => (
          <SidebarGroup key={group.title}>
            {group.icon && (
              <SidebarGroupLabel className="flex items-center gap-2">
                {group.icon}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>{renderSidebarItems(group.items)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings /> Settings
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
                <DropdownMenuItem></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
