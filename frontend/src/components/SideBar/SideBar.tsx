import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import SideBarHeader from './SideBarHeader'
import SideBarMenu from './SideBarMenu'

import { Drawer, Paper } from '@mui/material'

export default function SideBar(props: {
  sidebarFixed: any
  sidebarShadow: any
}) {
  const { sidebarFixed, sidebarShadow } = props

  const sidebarMenuContent = (
    <>
      // TODO: add side bar menu items
      {[].map((list) => (
        <SideBarMenu component="div" key={list} pages={list} title={list} />
      ))}
    </>
  )

  return (
    <>
      <Drawer anchor="left" variant="temporary" elevation={4}>
        <SideBarHeader />
        <PerfectScrollbar>{sidebarMenuContent}</PerfectScrollbar>
      </Drawer>

      <Paper square elevation={sidebarShadow ? 11 : 3}>
        <SideBarHeader />
        <PerfectScrollbar options={{ wheelPropagation: false }}>
          {sidebarMenuContent}
        </PerfectScrollbar>
      </Paper>
    </>
  )
}
