import React from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import HeaderLogo from './HeaderLogo'
import HeaderUserBox from './HeaderUserBox'
import MenuIcon from '@mui/icons-material/Menu'

export default function Header() {
  return (
    <>
      <Box sx={{ marginBottom: '3em' }}>
        <AppBar
          color="primary"
          position={'fixed'}
          elevation={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1, display: 'flex' }}>
              <HeaderLogo />
            </Typography>
            <HeaderUserBox />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
