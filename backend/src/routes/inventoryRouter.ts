import { Router } from 'express'
import { getInventory } from '../controllers/InventoryController'

export default (router: Router) => {
  router.get('/inventory', getInventory)
}
