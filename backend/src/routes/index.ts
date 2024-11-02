import { Router } from 'express'
import authentication from './authRouter'
import userRouter from './userRouter'
import inventoryRouter from './inventoryRouter'
import brickLinkRouter from './brickLinkRouter'

const router = Router()

export default () => {
  authentication(router)
  userRouter(router)
  inventoryRouter(router)
  brickLinkRouter(router)

  return router
}
