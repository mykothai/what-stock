// Store Inventory
 
export interface StoreInventoryData {
  bind_id: number
  bulk: number
  // color_id: number
  color_name: string
  date_created: string
  description: string
  inventory_id: number
  is_retain: boolean
  is_stock_room: boolean
  no: string
  name: string
  type: string
  // category_id: number
      my_cost: string
  my_weight: string
  new_or_used: string
  quantity: number
  remarks: string
  sale_rate: number
  tier_price1: string
  tier_price2: string
  tier_price3: string
  // tier_quantity1: number
  // tier_quantity2: number
  // tier_quantity3: number
  unit_price: string
}

interface InventoryHeader {
  disablePadding: boolean;
  id: keyof StoreInventoryData;
  label: string;
  numeric: boolean;
}

// Headers for store inventory, not all columns are useful right now and are commented out
export const InventoryHeaders: readonly InventoryHeader[] = [
  {
    id: 'inventory_id',
    numeric: true,
    disablePadding: false,
    label: 'Inventory ID',
  },
  {
    id: 'no',
    numeric: true,
    disablePadding: false,
    label: 'Item No.',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Item Name',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Item Type',
  },
  // {
  //   id: 'category_id',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Item Cat ID',
  // },
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
  // {
  //   id: 'color_id',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Color ID',
  // },
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
  // {
  //   id: 'tier_price1',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'tier_price1',
  // },
  // {
  //   id: 'tier_price2',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'tier_price2',
  // },
  // {
  //   id: 'tier_price3',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'tier_price3',
  // },
  // {
  //   id: 'tier_quantity1',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'tier_quantity1',
  // },
  // {
  //   id: 'tier_quantity2',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'tier_quantity2',
  // },
  // {
  //   id: 'tier_quantity3',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'tier_quantity3',
  // },
];