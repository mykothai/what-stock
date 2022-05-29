import React from 'react'
import { useState, useEffect } from 'react'
import { getInventories } from '../api/StoreApi'

export default function StoreInventory() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    getStoreInventories()
  }, [])
  
  const getStoreInventories = async () => {
    let inventories = await getInventories()
    setInventories(inventories.data)
  }

  return (
    <>
      {inventories.map((inventory, key) => (
        <tr key={key}>
        {
          Object.entries(inventory).map((value, key) => {
            return <td key={key}>{`${value}`}</td>
          })
        }
        </tr>
      ))}
    </>
  )
}

