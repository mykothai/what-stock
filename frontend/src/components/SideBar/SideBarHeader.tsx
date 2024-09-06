import React from 'react'
import { Link } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'

export default function SideBarHeader(props: any) {
  return (
    <>
      <Box>
        <Link to="/">
          <IconButton color="primary" size="medium"></IconButton>
        </Link>
      </Box>
    </>
  )
}
