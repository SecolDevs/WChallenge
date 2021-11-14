import { Request, Response } from 'express'

export const indexMessage = (req: Request, res: Response) => {
  return res.json('Welcome to WChallenge. API is working properly.')
}
