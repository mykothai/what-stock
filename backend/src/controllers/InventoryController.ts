import { Request, Response } from 'express'
import { getItems } from '../models/Item'

require('dotenv').config()

export const getInventory = async (_req: Request, res: Response) => {
  try {
    const result = await getItems()

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get items' })
  }
}
