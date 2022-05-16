import OAuth from 'oauth'
import { Parser } from 'json2csv'
import fs from 'fs'
require('dotenv').config()

const oauth = new OAuth.OAuth(
  '',
  '',
  process.env.BL_CONSUMER_KEY || '',
  process.env.BL_CONSUMER_SECRET || '',
  process.env.OAUTH_VERSION || '1.0',
  null,
  process.env.BL_SIGNATURE_METHOD || 'HMAC-SHA1'
)

// oauth.get(process.env.BL_BASE_URL, )