import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../../interface/Users.interface'

const rounds: number = Number(process.env.AUTH_ROUNDS) // Get number of rounds from .env file
const secret: string = process.env.AUTH_SECRET // Get secre from .env file
const expiresIn: string = process.env.AUTH_EXPIRES // Get expiresIn date from .env file

/**
 * Generate hash password
 * @param password raw password
 * @returns hashed password
 */
export const generatePassword = (password: string): string => {
  return bcrypt.hashSync(password, rounds)
}

/**
 * Compares password and returns if is the same or not
 * @param password Raw password
 * @param encryptedPassword Hashed password
 * @returns boolean with result of comparison
 */
export const comparePassword = (password: string, encryptedPassword: string): boolean => {
  return bcrypt.compareSync(password, encryptedPassword)
}

/**
 * Sign jwt
 * @param user object to save into jwt
 * @returns jwt string with user inside
 */
export const generateJWT = (user: User) => {
  return jwt.sign({ user }, secret, { expiresIn })
}

/**
 * Verifies if token is valid and returns the user inside token or throws an exception
 * @param token string with token to compare
 * @returns decoded user or throw exception
 */
export const verifyJWT = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    throw 'Invalid Token'
  }
}
