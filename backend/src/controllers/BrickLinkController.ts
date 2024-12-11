import OAuth from 'oauth'
import { Request, Response } from 'express'
import { env } from 'process'
import { updateItemById } from '../models/Item'
import { STORES } from 'src/constants'

require('dotenv').config()

export const getInventory = async (_req: Request, res: Response) => {
  try {
    const oauth = new OAuth.OAuth(
      '',
      '',
      process.env.BL_CONSUMER_KEY,
      process.env.BL_CONSUMER_SECRET,
      process.env.OAUTH_VERSION,
      null,
      process.env.BL_SIGNATURE_METHOD
    )

    const result = oauth.get(
      `${env.BL_BASE_URL}/inventories`,
      process.env.BL_TOKEN_VALUE,
      process.env.BL_TOKEN_SECRET,
      async (error: any, data: string) => {
        if (error) {
          console.error(error)
          res.send(error)
        }

        const parsedResult = JSON.parse(data)

        // Update or upsert the item
        return await Promise.all(
          parsedResult.data.map((item: Record<string, any>) => {
            return new Promise(() => updateItemById(item.item.no, {...item,
            listed_on: STORES.BrickLink}))
          })
        )
      }
    )

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get inventory from BL' })
  }
}
