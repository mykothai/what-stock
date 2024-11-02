import { Request, Response }  from 'express'
import { getUsers, getUserByUserId, deleteUserById, updateUserById } from '../models/User'

export const getAllUsers = async(req: Request, res: Response) => {
  try {
    const users = await getUsers()

    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to retrieve users' })
  }
}

export const getUserById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await getUserByUserId(id)

    if (!result) {
      throw Error(`Failed to get user with ID ${id}`)
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `${error.message}` })
  }
}

export const updateUser = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username, email } = req.body


    const result = await updateUserById(id, { username, email })

    if (!result) {
      throw Error(`Failed to update user with ID ${id}`)
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `${error.message}` })
  }
}

export const deleteUser = async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await deleteUserById(id)

    if (!result) {
      throw Error(`Failed to delete user with ID ${id}`)
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: `${error.message}` })
  }
}
