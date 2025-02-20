import * as React from 'react'

import { SearchForm } from '@components/Sidebar/search-form'
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
import { ChevronUp, House, Settings, Toilet } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { useIsMobile } from '@components/hooks/use-mobile'

interface BaseSidebarItem {
  title: string
  url: string
  icon: React.ReactNode
}

interface ParentSidebarItem extends BaseSidebarItem {
  items: ChildSidebarItem[]
}

interface ChildSidebarItem extends BaseSidebarItem {
  isActive: boolean
  items?: ChildSidebarItem[]
}

interface SidebarNavMenu {
  navMain: ParentSidebarItem[]
}

const data: SidebarNavMenu = {
  navMain: [
    {
      title: 'What The Stock?',
      url: '#',
      icon: <Toilet />,
      items: [
        {
          title: 'Everything',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Categories',
          url: '#',
          isActive: false,
          icon: <Toilet />,
          items: [
            {
              title: 'Lego',
              url: '#',
              isActive: false,
              icon: <Toilet />,
            },
            {
              title: 'Hot Wheels',
              url: '#',
              isActive: false,
              icon: <Toilet />,
            },
            {
              title: 'T-Shirts',
              url: '#',
              isActive: false,
              icon: <Toilet />,
            },
            {
              title: 'Lanyards',
              url: '#',
              isActive: false,
              icon: <Toilet />,
            },
            {
              title: 'Others',
              url: '#',
              isActive: false,
              icon: <Toilet />,
            },
          ],
        },
      ],
    },
    {
      title: 'BrickLink',
      url: '#',
      icon: <Toilet />,
      items: [
        {
          title: 'Inventory',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Listed',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Sales',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
      ],
    },
    {
      title: 'eBay',
      url: '#',
      icon: <Toilet />,
      items: [
        {
          title: 'Inventory',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Listed',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Sales',
          url: '#',
          isActive: false,
          icon: <Toilet />,
        },
      ],
    },
  ],
}

const renderSidebarItems = (items: ChildSidebarItem[]) => {
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
          <SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                  <a href={subItem.url} className="flex items-center gap-2">
                    {subItem.icon}
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        ))}
    </SidebarMenuItem>
  ))
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton>
          <House /> What Stock
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group: ParentSidebarItem) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderSidebarItems(group.items)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
