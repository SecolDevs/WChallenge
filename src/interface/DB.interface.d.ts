export interface dbConnection {
  development: ConnectionOptions
  test: ConnectionOptions
  production: ConnectionOptions
}

export interface ConnectionOptions {
  type: string
  database: string
  synchronize: Boolean
  logging: Boolean
  entities: string[]
}
