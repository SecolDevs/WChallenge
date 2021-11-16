import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Users } from './Users.entity'

@Entity()
export class Coins {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  coinId: string
  @Column()
  symbol: string
  @Column()
  name: string
  @Column()
  image: string
  @ManyToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: number
}
