import { Button, Box, Avatar, Menu, List, ListItem } from '@mui/material'
import React from 'react'

export default function HeaderUserBox() {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        <Box>
          <Avatar
            sizes="44"
            alt="user pp"
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.peta.org%2Ffeatures%2Freasons-never-to-drink-goats-milk%2F&psig=AOvVaw3SyY0xfJr8Mv-307kVdfOJ&ust=1653977414476000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNjcy5XIhvgCFQAAAAAdAAAAABAD"
          />
        </Box>
        <div>
          user name here
          {/* TODO: add user name here */}
        </div>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handleClose}>
        <List>
          <ListItem>My Account</ListItem>
        </List>
      </Menu>
    </>
  )
}
