// Store Inventory from DB
export interface StoreInventoryFields {
  inventory_id: number
  item: {
    no: string
    name: string
    type: string
    category_id: number
  }
  no: string
  name: string
  type: string
  category_id: number
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

export enum CONDITION {
  N = 'New',
  U = 'Used',
}

export const DEFAULT_PAGE_SIZES = [25, 50, 75, 100]
