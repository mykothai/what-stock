import React from 'react'
import SideBar from './SideBar'

export default function LeftSideBar(props: any) {
  const { children } = props

  return (
    <>
      <SideBar sidebarShadow={undefined} sidebarFixed />

      <div>{children}</div>
    </>
  )
}
