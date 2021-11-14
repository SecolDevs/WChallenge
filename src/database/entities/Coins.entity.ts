import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { Users } from './Users.entity'

@Entity()
export class Coins {
  @PrimaryColumn()
  id: number
  @Column()
  coinId: string
  @Column()
  symbol: string
  @Column()
  name: string
  @Column()
  image: string
  @OneToOne(() => Users)
  @JoinColumn()
  user_id: Users
}
