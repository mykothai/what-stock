import React from 'react'
import Paper from '@mui/material/Paper'

export default function PageTitle(props: {
  titleHeading: string
  titleDescription: string
}) {
  return (
    <>
      <Paper square elevation={2}>
        <h1>{props.titleHeading}</h1>
        <div>{props.titleDescription}</div>
      </Paper>
    </>
  )
}
