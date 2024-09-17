// Store Inventory
export interface StoreInventoryData {
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

interface InventoryHeader {
  disablePadding: boolean
  id: keyof StoreInventoryData
  label: string
  numeric: boolean
}

export const InventoryHeaders: readonly InventoryHeader[] = [
  {
    id: 'inventory_id',
    numeric: true,
    disablePadding: false,
    label: 'Inventory ID',
  },
  {
    id: 'item',
    numeric: true,
    disablePadding: false,
    label: 'Item No.',
  },
  {
    id: 'item',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  {
    id: 'item',
    numeric: false,
    disablePadding: false,
    label: 'Item Type',
  },
  {
    id: 'item',
    numeric: true,
    disablePadding: false,
    label: 'Item Cat ID',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'my_cost',
    numeric: true,
    disablePadding: false,
    label: 'My Cost',
  },
  {
    id: 'my_weight',
    numeric: true,
    disablePadding: false,
    label: 'Weight',
  },
  {
    id: 'new_or_used',
    numeric: false,
    disablePadding: false,
    label: 'Condition',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'unit_price',
    numeric: true,
    disablePadding: false,
    label: 'Unit Price',
  },
  {
    id: 'remarks',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
  {
    id: 'color_name',
    numeric: false,
    disablePadding: false,
    label: 'Color',
  },
  {
    id: 'is_retain',
    numeric: false,
    disablePadding: false,
    label: 'Retain In Inventory',
  },
  {
    id: 'is_stock_room',
    numeric: false,
    disablePadding: false,
    label: 'Hidden',
  },
  {
    id: 'sale_rate',
    numeric: true,
    disablePadding: false,
    label: 'Sale Rate',
  },
  {
    id: 'date_created',
    numeric: false,
    disablePadding: false,
    label: 'Lot Date Created',
  },
  {
    id: 'bulk',
    numeric: true,
    disablePadding: false,
    label: 'Bulk Multiplier',
  },
  {
    id: 'bind_id',
    numeric: true,
    disablePadding: true,
    label: 'Parent Lot ID',
  },
]
