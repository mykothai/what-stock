import React from 'react'
import Container from '@mui/material/Container'
import StoreInventory from './StoreInventory'

export default function LandingDashboard() {
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <StoreInventory />
      </Container>
    </>
  )
}
