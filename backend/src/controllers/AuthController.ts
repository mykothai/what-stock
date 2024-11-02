import { Request, Response } from 'express'
import { createUser, getUserByEmail } from '../models/User'
import { authentication, random } from '../auth'

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

export const login = async(req: Request, res: Response) => { 
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400)
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
    if (!user) {
      res.status(400)
    }

    // check credentials
    const expectedHash = authentication(user.authentication.salt, password)
    if (user.authentication.password !== expectedHash) {
      res.status(403)
    }

    // update user session token
    const salt = random()
    user.authentication.sessionToken = authentication(salt, user._id.toString())

    await user.save()

    res.cookie(`${user.username}-AUTH`, user.authentication.sessionToken, { domain: 'localhost', path: '/'})

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Failed to login' })
  }
}