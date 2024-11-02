import { Router } from 'express'
import { getInventory } from '../controllers/BrickLinkController'

export default (router: Router) => {
  router.get('/bl/inventory', getInventory)
}
