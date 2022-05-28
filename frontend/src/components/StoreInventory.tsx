import React from 'react'
import { useState, useEffect } from 'react'
import { getInventories } from '../api/StoreApi'

export default function StoreInventory() {

  useEffect(() => {
    getStoreInventories()
  }, [])
  
  const getStoreInventories = async () => {
    console.log("Inventories\n", await getInventories())
  }

  return (
    <></>
  )
}

