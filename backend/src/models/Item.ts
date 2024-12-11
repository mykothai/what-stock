// const Mongoose = require('mongoose')
import Mongoose from 'mongoose'

const ItemSchema = new Mongoose.Schema({
  inventory_id: {
    type: Number,
    required: true,
  },
  item: {
    no: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category_id: {
      type: Number,
      required: true,
    },
  },
  color_id: {
    type: Number,
    required: true,
  },
  color_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  new_or_used: {
    type: String,
    required: true,
  },
  completeness: {
    type: String,
    required: false,
  },
  unit_price: {
    type: String,
    required: true,
  },
  bind_id: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  },
  bulk: {
    type: Number,
    required: false,
  },
  is_retain: {
    type: Boolean,
    required: true,
  },
  is_stock_room: {
    type: Boolean,
    required: true,
  },
  stock_room_id: {
    type: String,
    required: false,
  },
  date_created: {
    type: String,
    required: true,
  },
  my_cost: {
    type: String,
    required: false,
  },
  sale_rate: {
    type: Number,
    required: true,
  },
  tier_quantity1: {
    type: Number,
    required: true,
  },
  tier_quantity2: {
    type: Number,
    required: true,
  },
  tier_quantity3: {
    type: Number,
    required: true,
  },
  tier_price1: {
    type: String,
    required: true,
  },
  tier_price2: {
    type: String,
    required: true,
  },
  tier_price3: {
    type: String,
    required: true,
  },
  my_weight: {
    type: String,
    required: false,
  },
})

const CustomItemPropertiesSchema = new Mongoose.Schema({
  listed_on: {
    type: String,
    required: true,
  },
})


export const ItemModel = Mongoose.model('Item', ItemSchema && CustomItemPropertiesSchema)

export const getItems = () => ItemModel.find()
export const getItemById = (id: string) => ItemModel.findById({ id })
export const createItem = (values: Record<string, any>) => new ItemModel(values).save().then((item) => item.toObject())
export const deleteItem = (id: string) => ItemModel.findOneAndDelete({ _id: id })
export const updateItemById = (itemNo: string, values: Record<string, any>) =>
{console.log('update values', values)
  ItemModel.findOneAndUpdate({ item: { no: itemNo } }, values, { upsert: true })}
