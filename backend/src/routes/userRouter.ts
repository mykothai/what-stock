import { Router } from 'express'
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/UserController'

export default (router: Router) => {
  router.get('/users', getAllUsers)
  router.get('/user/:id', getUserById)
  router.patch('/user/:id', updateUser)
  router.delete('/user/:id', deleteUser)
}
