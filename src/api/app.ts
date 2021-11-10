import express, { Application } from 'express'
import morgan from 'morgan'

import indexRoutes from './routes/index.routes'

export class App {
  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  /** Initialize server config */
  settings() {
    this.app.set('port', this.port || process.env.PORT || 4000)
  }

  /** Initialialize Middlewares */
  middlewares() {
    this.app.use(morgan(`dev`))
  }

  /** Initialize routes */
  routes() {
    this.app.use('/', indexRoutes)
  }

  /** Starts the server */
  async listen() {
    await this.app.listen(this.app.get('port'))
    console.log(`Listening on port ${this.app.get('port')}`)
  }
}
