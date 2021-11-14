import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { User } from '../../interface/Users.interface'
import { Users } from '../entities/Users.entity'

export const createUser = async (user: User) => {
  const newUser = getRepository(Users).create(user)
  const errors = await validate(newUser)
  if (errors.length > 0) {
    throw errors
  } else {
    return await getRepository(Users).save(newUser)
  }
}

export const getAllUsers = async (user: User) => {
  const users = await getRepository(Users).find(user)
  return users
}

export const getOneUser = async (user: User) => {
  const userResponse = await getRepository(Users).findOne(user)
  return userResponse
}
