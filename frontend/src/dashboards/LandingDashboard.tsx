import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import StoreInventory from './StoreInventory'
import PageTitle from '../components/PageTitle'

export default function LandingDashboard() {
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <StoreInventory />
      </Container>
    </>
  )



  
}
