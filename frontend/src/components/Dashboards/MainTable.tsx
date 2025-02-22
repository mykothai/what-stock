import { useEffect, useState } from 'react'
import { getInventory } from '@api/StoreApi'
import { DataTable } from '@components/ui/table/data-table'
import {
  MainInventoryColumns,
  StoreInventory,
} from '@components/ui/table/columns'

export default function MainTable() {
  const [inventory, setInventory] = useState<StoreInventory[]>([])

  const getStoreInventories = async () => {
    try {
      const inventory = (await getInventory().then((res) => res.data)) || []
      setInventory(inventory)
    } catch (error) {
      console.error('Failed fetching inventory.', error)
    }
  }

  useEffect(() => {
    getStoreInventories()
  }, [])

  return (
    <div className="flex mx-10 py-10">
      <DataTable columns={MainInventoryColumns} data={inventory} />
    </div>
  )
}
