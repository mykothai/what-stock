import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './column-header'
import { formatCurrency } from '@helper/conversion'
import { CONDITION } from '@constants'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip'
import he from 'he'
import { TooltipWrapper } from '../tooltip-wrapper'

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
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(item.item.name.toString())
              }>
              Copy Item Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sell</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    accessorKey: 'inventory_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Inventory Id" />
    ),
    cell: ({ row }) => {
      const inventoryId = parseFloat(row.getValue('inventory_id'))
      return <div className="text-left font-small">{inventoryId}</div>
    },
  },
  {
    accessorKey: 'item.no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item No." />
    ),
  },
  {
    accessorKey: 'item.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: ({ row }) => {
      const itemName = row.original.item.name
      return (
        <div className="text-center font-small">
          <TooltipWrapper text={itemName} charLimit={50} />
        </div>
      )
    },
  },
  {
    accessorKey: 'item.type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const type = row.original.item.type
      return <div className="text-center font-small">{type}</div>
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qty" />
    ),
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue('quantity'))
      return <div className="text-center font-small">{quantity}</div>
    },
  },
  {
    accessorKey: 'unit_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('unit_price'))
      return (
        <div className="text-right font-small">{formatCurrency(amount)}</div>
      )
    },
  },
  {
    accessorKey: 'my_cost',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Cost" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('my_cost'))
      return (
        <div className="text-right font-small">{formatCurrency(amount)}</div>
      )
    },
  },
  {
    accessorKey: 'my_weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight (kg)" />
    ),
  },
  {
    accessorKey: 'new_or_used',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Condition" />
    ),
    cell: ({ row }) => {
      const condition = row.getValue('new_or_used') as keyof typeof CONDITION
      return (
        <div className="text-center font-small">{CONDITION[condition]}</div>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: 'color_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      const colorName: string = row.getValue('color_name')
      return <div className="text-center font-small">{colorName}</div>
    },
  },
  {
    accessorKey: 'is_stock_room',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hidden" />
    ),
    cell: ({ row }) => {
      const isStockRoom: boolean = row.getValue('is_stock_room')
      return (
        <div className="text-center font-small">
          {isStockRoom ? 'True' : 'False'}
        </div>
      )
    },
  },
]
