import { Equals, IsNotEmpty } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { IsUserNameAlreadyExist } from '../customValidators/UserNameExists'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  @IsNotEmpty({ message: 'firstName is required' })
  firstName: string
  @Column()
  @IsNotEmpty({ message: 'lastName is required' })
  lastName: string
  @Column()
  @IsNotEmpty({ message: 'userName is required' })
  @IsUserNameAlreadyExist({ message: 'userName already exists' })
  userName: string
  @Column()
  @IsNotEmpty({ message: 'password is required' })
  password: string
  @Column()
  @IsNotEmpty({ message: 'favouriteCurrency is required' })
  @Equals('ars' || 'eur' || 'usd', { message: 'Only accepts eur, ars or usd' })
  favouriteCurrency: string
}
