import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { User } from '../../interface/Users.interface'
import { Users } from '../entities/Users.entity'

/**
 * @param user Object with user data to insert into database
 * @returns Create user or throws error
 */
export const createUser = async (user: User) => {
  const newUser = getRepository(Users).create(user)
  const errors = await validate(newUser)
  if (errors.length > 0) {
    throw errors
  } else {
    return await getRepository(Users).save(newUser)
  }
}

/**
 * @param user Object to get users from database
 * @returns finded user
 */
export const findOneUser = async (user: User) => {
  const userResponse = await getRepository(Users).findOne(user)
  return userResponse
}
