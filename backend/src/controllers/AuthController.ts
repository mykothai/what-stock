import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../models/User'
import { random } from '../auth'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      res.status(400)
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      res.status(400)
    }

    const salt = random()
    const user = await createUser({ username, email, authentication: { password, salt } })

    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Failed register user.' })
  }
}
