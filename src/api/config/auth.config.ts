import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../../interface/Users.interface'

const rounds: number = process.env.AUTH_ROUNDS
const secret: string = process.env.AUTH_SECRET
const expiresIn: string = process.env.AUTH_EXPIRES

export const generatePassword = (password: string): string => {
  return bcrypt.hashSync(password, rounds)
}

export const comparePassword = (password: string, encryptedPassword: string): boolean => {
  return bcrypt.compareSync(password, encryptedPassword)
}

export const generateJWT = (user: User) => {
  return jwt.sign({ user }, secret, { expiresIn })
}

export const verifyJWT = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    throw 'Invalid Token'
  }
}
