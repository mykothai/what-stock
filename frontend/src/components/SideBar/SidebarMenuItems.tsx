import React from 'react'

export type MenuItem = {
  name: string
  path: string
  icon: React.ReactNode
};

export default function SidebarMenuItems(): MenuItem[] {
  return [
    { name: 'Home', path: '/', icon: <span>🏠</span> },
    { name: 'Profile', path: '/profile', icon: <span>👤</span> },
    { name: 'Settings', path: '/settings', icon: <span>⚙️</span> },
  ]
}
