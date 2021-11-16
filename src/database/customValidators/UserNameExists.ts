import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'
import { getRepository } from 'typeorm'
import { Users } from '../entities/Users.entity'

/** Custom validator to validate if username already exists */
@ValidatorConstraint({ async: true })
export class IsUserNameAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(userName: any, args: ValidationArguments) {
    return getRepository(Users)
      .findOne({ userName })
      .then((user) => {
        if (user) return false
        return true
      })
  }
}

export function IsUserNameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNameAlreadyExistConstraint,
    })
  }
}
