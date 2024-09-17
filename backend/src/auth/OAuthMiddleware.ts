import OAuth from 'oauth'

require('dotenv').config()

class OAuthMiddleware {
  static getAuthHeaderForRequest(request: Request) {
    const oauth = new OAuth.OAuth(
      '',
      '',
      process.env.BL_CONSUMER_KEY || '',
      process.env.BL_CONSUMER_SECRET || '',
      process.env.OAUTH_VERSION || '1.0',
      null,
      process.env.BL_SIGNATURE_METHOD || 'HMAC-SHA1',
    )

    return oauth.authHeader(request.url, process.env.BL_TOKEN_VALUE, process.env.BL_TOKEN_SECRET, request.method)
  }
}

export default OAuthMiddleware