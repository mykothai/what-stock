import { Router } from 'express'
import { register } from '../controllers/AuthController'

export default (router: Router) => {
  router.post('/auth/register', register)
}
