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
import { ChevronUp, House, Settings, Tally5, Toilet } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import eBayLogo from '@assets/images/eBayLogo-4Color-RGB.png'
import blLogo from '@assets/images/BrickLink_glyph.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModeToggle } from '@components/mode-toggle'

interface BaseSidebarItem {
  title: string
  url?: string
  icon?: React.ReactNode
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
      items: [
        {
          title: 'Everything',
          url: '#',
          isActive: false,
          icon: <Tally5 />,
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
      icon: (
        <img className="w-6 h-6" src={blLogo} alt="bl logo" loading="lazy" />
      ),
      items: [
        {
          title: 'Inventory',
          url: 'bl-inventory',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Sales',
          url: 'bl-sales',
          isActive: false,
          icon: <Toilet />,
        },
      ],
    },
    {
      title: 'eBay',
      icon: (
        <img
          className="w-6 h-6 scale-250"
          src={eBayLogo}
          alt="eBay logo"
          loading="lazy"
        />
      ),
      items: [
        {
          title: 'Inventory',
          url: 'eb-inventory',
          isActive: false,
          icon: <Toilet />,
        },
        {
          title: 'Sales',
          url: 'eb-sales',
          isActive: false,
          icon: <Toilet />,
        },
      ],
    },
  ],
}

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
          <SidebarMenuItem>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton
                  asChild
                  isActive={subItem.isActive}
                  onClick={() => navigate(subItem.url!)}
                  className={`flex items-center gap-2 ${
                    location.pathname === subItem.url
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-00'
                  }`}>
                  <div>
                    {subItem.icon}
                    <span>{subItem.title}</span>
                  </div>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        ))}
    </SidebarMenuItem>
  ))
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton onClick={() => navigate('/')}>
          <House /> What the Stock?
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group: ParentSidebarItem) => (
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
