import 'reflect-metadata'
require('dotenv').config()
import { App } from './api/app'

/** Initialize app and server */
const main = async () => {
  const app = new App()
  await app.listen()
}

main()
