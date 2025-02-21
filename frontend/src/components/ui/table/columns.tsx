import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './column-header'
import { formatCurrency } from '@helper/conversion'
import { CONDITION } from '@constants'

export type StoreInventory = {
  inventory_id: number
  item: {
    no: string
    name: string
    type: string
    category_id: number
  }
  color_id: number
  color_name: string
  quantity: number
  new_or_used: string
  completeness?: string
  unit_price: string
  bind_id: number
  description: string
  remarks: string
  bulk: number
  is_retain: boolean
  is_stock_room: boolean
  stock_room_id?: string
  date_created: string
  my_cost: string
  sale_rate: number
  tier_quantity1: number
  tier_price1: string
  tier_quantity2: number
  tier_price2: string
  tier_quantity3: number
  tier_price3: string
  my_weight: string
}

export const MainInventoryColumns: ColumnDef<StoreInventory>[] = [
  {
    accessorKey: 'inventory_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory Id" />
    ),
    cell: ({ row }) => {
      const inventoryId = parseFloat(row.getValue('inventory_id'))
      return <div className="text-left font-medium">{inventoryId}</div>
    },
  },
  {
    accessorKey: 'item.no',
    header: 'Item No.',
  },
  { accessorKey: 'item.name', header: 'Item Name' },
  {
    accessorKey: 'item.type',
    header: 'Item Type',
    cell: ({ row }) => {
      const type = row.original.item.type
      return <div className="text-center font-medium">{type}</div>
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue('quantity'))
      return <div className="text-center font-medium">{quantity}</div>
    },
  },
  {
    accessorKey: 'unit_price',
    header: 'Unit Price',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('unit_price'))
      return (
        <div className="text-right font-medium">{formatCurrency(amount)}</div>
      )
    },
  },
  {
    accessorKey: 'my_cost',
    header: 'My Cost',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('my_cost'))
      return (
        <div className="text-right font-medium">{formatCurrency(amount)}</div>
      )
    },
  },
  {
    accessorKey: 'my_weight',
    header: 'Weight',
  },
  {
    accessorKey: 'new_or_used',
    header: 'Condition',
    cell: ({ row }) => {
      const condition = row.getValue('new_or_used') as keyof typeof CONDITION
      return (
        <div className="text-center font-medium">{CONDITION[condition]}</div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'color_name',
    header: 'Color',
    cell: ({ row }) => {
      const colorName: string = row.getValue('color_name')
      return <div className="text-center font-medium">{colorName}</div>
    },
  },
  {
    accessorKey: 'is_stock_room',
    header: 'Hidden',
    cell: ({ row }) => {
      const isStockRoom: boolean = row.getValue('is_stock_room')
      return (
        <div className="text-center font-medium">
          {isStockRoom ? 'True' : 'False'}
        </div>
      )
    },
  },
]
