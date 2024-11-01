import { Router } from "express"
import authentication from "./authRouter"

const router = Router()

export default () => {
  authentication(router)

  return router
}
