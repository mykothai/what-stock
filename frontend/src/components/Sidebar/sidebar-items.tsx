import { Tally5, Toilet } from 'lucide-react'
import eBayLogo from '@assets/images/eBayLogo-4Color-RGB.png'
import blLogo from '@assets/images/BrickLink_glyph.png'

export interface BaseSidebarItem {
  title: string
  url?: string
  icon?: React.ReactNode
}

export interface ParentSidebarItem extends BaseSidebarItem {
  items: ChildSidebarItem[]
}

export interface ChildSidebarItem extends BaseSidebarItem {
  isActive: boolean
  items?: ChildSidebarItem[]
}

export interface SidebarNavMenu {
  navMain: ParentSidebarItem[]
}

export const sidebarNavItems: SidebarNavMenu = {
  navMain: [
    {
      title: 'What The Stock?',
      url: '#',
      items: [
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
