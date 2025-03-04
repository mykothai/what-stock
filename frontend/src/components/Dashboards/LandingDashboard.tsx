import React from 'react'
import MainTable from './MainTable'

export default function LandingDashboard() {
  return (
    <div className="flex flex-1 flex-col top-0 left-0 gap-4 p-4 h-screen overflow-hidden">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min overflow-auto">
        <MainTable />
      </div>
    </div>
  )
}
