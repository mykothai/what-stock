import React from 'react'
import PropTypes from 'prop-types'

import SideBarMenuListItem from './SideBarMenuListItem'
import { List, Typography } from '@mui/material'
import { Router } from 'react-router-dom'

export default function SideBarMenuList(props: {
  [x: string]: any
  pages: any
}) {
  const { pages, ...rest } = props

  return (
    <List>
      {pages.reduce(
        (items: any, page: string) =>
          reduceChildRoutes({ items, page, ...rest }),
        [],
      )}
    </List>
  )
}

SideBarMenuList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array,
}

const reduceChildRoutes = (props: {
  items: any
  page: any
  router?: any
  depth?: any
}) => {
  const { router, items, page, depth } = props

  if (page.content) {
    items.push(
      <SideBarMenuListItem
        depth={depth}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        title={page.label}>
        <SideBarMenuList
          depth={depth + 1}
          pages={page.content}
          router={router}
        />
      </SideBarMenuListItem>,
    )
  } else {
    items.push(
      <SideBarMenuListItem
        depth={depth}
        href={page.to}
        icon={page.icon}
        key={page.label}
        label={page.badge}
        title={page.label}
      />,
    )
  }

  return items
}

const SideBarMenu = (props: {
  [x: string]: any
  title: any
  pages: any
  className: any
  component: any
}) => {
  const { title, pages, className, component: Component, ...rest } = props

  return (
    <Component {...rest} className={className}>
      {title && <Typography>{title}</Typography>}
      <SideBarMenuList depth={0} pages={pages} router={Router} />
    </Component>
  )
}
