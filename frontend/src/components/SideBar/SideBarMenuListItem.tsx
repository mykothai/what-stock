import React, { useState } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { ListItem, Button, Collapse } from '@mui/material'

export default function SideBarMenuListItem(props: any) {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    className,
    open: openProp,
    label: Label,
    ...rest
  } = props

  const [open, setOpen] = useState(openProp)

  const handleToggle = () => {
    setOpen((open: boolean) => !open)
  }

  let paddingLeft = 22

  if (depth > 0) {
    paddingLeft = 16 + 20 * depth
  }
  const style = {
    paddingLeft,
  }

  if (children) {
    return (
      <ListItem {...rest} disableGutters>
        <Button color="primary" onClick={handleToggle} style={style}>
          <span>{title}</span>
          {open ? (
            <ExpandLessIcon color="inherit" />
          ) : (
            <ExpandLessIcon color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    )
  } else {
    return <ListItem {...rest} disableGutters></ListItem>
  }
}
