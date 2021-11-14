import { createConnection } from 'typeorm'
import { dbConfig } from './db.config'

export const connectToDB = async () => {
  let env: any = process.env.NODE_ENV
  await createConnection(dbConfig[env])
}
