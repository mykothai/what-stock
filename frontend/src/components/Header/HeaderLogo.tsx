import React from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Box } from '@mui/material'

const HeaderLogo = (props: any) => {
  return (
    <>
      <Box title="inStock">
        <Link to="/LandingDashboard">
          <IconButton color="primary" size="medium"></IconButton>
        </Link>
        <Box>InStock</Box>
      </Box>
    </>
  )
}

export default HeaderLogo
