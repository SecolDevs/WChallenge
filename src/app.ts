import express, { Application } from 'express'
import morgan from 'morgan'

export class App {
  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.settings()
    this.middlewares()
  }

  /** Initialize server config */
  settings() {
    this.app.set('port', this.port || process.env.PORT || 4000)
  }

  /** Initilialize Middlewares */
  middlewares() {
    this.app.use(morgan(`dev`))
  }

  /** Starts the server */
  async listen() {
    await this.app.listen(this.app.get('port'))
    console.log(`Listening on port ${this.app.get('port')}`)
  }
}
