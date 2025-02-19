import * as React from 'react'

import { SearchForm } from '@components/search-form'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@components/ui/sidebar'

const data = {
  navMain: [
    {
      title: 'Stock',
      url: '#',
      items: [
        {
          title: 'All',
          url: '#',
        },
        {
          title: 'Categories',
          url: '#',
          items: [
            {
              title: 'Lego',
              url: '#',
              isActive: false,
            },
            {
              title: 'Hot Wheels',
              url: '#',
              isActive: false,
            },
            {
              title: 'T-Shirts',
              url: '#',
              isActive: false,
            },
          ],
        },
      ],
    },
    {
      title: 'BrickLink',
      url: '#',
      items: [
        {
          title: 'Inventory',
          url: '#',
          isActive: false,
        },
        {
          title: 'Listed',
          url: '#',
          isActive: false,
        },
        {
          title: 'Sales',
          url: '#',
          isActive: false,
        },
      ],
    },
    {
      title: 'eBay',
      url: '#',
      items: [
        {
          title: 'Inventory',
          url: '#',
          isActive: false,
        },
        {
          title: 'Listed',
          url: '#',
          isActive: false,
        },
        {
          title: 'Sales',
          url: '#',
          isActive: false,
        },
      ],
    },
    {
      title: '$',
      url: '#',
      items: [
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
