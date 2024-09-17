import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const HeaderLogo = (props: any) => {
  return (
    <>
      <Link to="/">
        <Typography variant="h6" component="div">
          What Stock
        </Typography>
      </Link>
    </>
  )
}

export default HeaderLogo
