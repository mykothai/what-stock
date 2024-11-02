import { Router } from "express"
import authentication from "./authRouter"
import userRouter from "./userRouter"

const router = Router()

export default () => {
  authentication(router)
  userRouter(router)

  return router
}
