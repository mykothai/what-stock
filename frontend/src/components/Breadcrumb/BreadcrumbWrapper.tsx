import { useLocation } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@components/ui/breadcrumb'
import React from 'react'
import { House } from 'lucide-react'

export default function BreadcrumbWrapper() {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">
            <House />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`

          return (
            <React.Fragment key={url}>
              <BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                {index === pathSegments.length - 1 ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage> // avoids linking to the current page
                ) : (
                  <BreadcrumbLink href={url}>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
