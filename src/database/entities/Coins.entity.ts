import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Coins {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  symbol: string
  @Column()
  name: string
  @Column()
  image: string
}
