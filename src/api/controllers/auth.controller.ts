import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { createUser, findOneUser } from '../../database/controllers/Users.controller'
import { User } from '../../interface/Users.interface'
import { comparePassword, generateJWT, generatePassword } from '../config/auth.config'

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const { firstName, lastName, userName, password, favouriteCurrency } = req.body
    const newPassword = generatePassword(password)
    const newUser: User = { firstName, lastName, userName, password: newPassword, favouriteCurrency }

    const createdUser = await createUser(newUser)
    return res.json(createdUser)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body
  const findedUser = await findOneUser({ userName })
  if (findedUser) {
    if (comparePassword(password, findedUser.password)) {
      const token = generateJWT(findedUser)
      return res.json({ user: findedUser, token })
    } else {
      return res.status(404).json({ message: 'userName or password is incorrect' })
    }
  } else {
    return res.status(404).json({ message: 'userName or password is incorrect.' })
  }
}
