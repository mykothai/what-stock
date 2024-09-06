import React from 'react'
import { AppBar, Box } from '@mui/material'
import HeaderLogo from './HeaderLogo'
import HeaderUserBox from './HeaderUserBox'

export default function Header(props: {
  isCollapsedLayout?: any
  headerShadow?: any
  headerFixed?: any
}) {
  const { headerShadow, headerFixed } = props

  return (
    <>
      <AppBar
        color="primary"
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box>
          <HeaderUserBox />
          <Box></Box>
        </Box>
      </AppBar>
    </>
  )
}
