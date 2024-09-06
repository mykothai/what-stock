import axios, { AxiosResponse } from 'axios'
import { env } from 'process'
import OAuthMiddleware from '../auth/OAuthMiddleware'
import OAuth from 'oauth'
import { Request, Response } from 'express'

require('dotenv').config()

// TODO: Refactor using Axios
export async function getInventories(req: Request, res: Response) {
  const oauth = new OAuth.OAuth(
    '',
    '',
    process.env.BL_CONSUMER_KEY,
    process.env.BL_CONSUMER_SECRET,
    '1.0',
    null,
    'HMAC-SHA1'
  )
  oauth.get(
    `${env.BL_BASE_URL}/inventories`,
    process.env.BL_TOKEN_VALUE,
    process.env.BL_TOKEN_SECRET,
    (error: any, data: string, result: any) => {
      if (error) {
        console.log(error)
        res.send(error)
      }

      console.log('get store inventory data', data)

      res.send(data)
    }
  )
}
