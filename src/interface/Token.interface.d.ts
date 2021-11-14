import { User } from './Users.interface'

export interface Token {
  user?: User
  iat?: number
  exp?: number
}
