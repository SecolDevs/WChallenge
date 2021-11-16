import { NextFunction, Request, Response } from 'express'
import { Token } from '../../interface/Token.interface'
import { verifyJWT } from '../config/auth.config'

export default async (req: any, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const decodedToken: Token = verifyJWT(token)
      req.user = decodedToken.user
      return next()
    } catch (error) {
      return res.status(401).json({ message: error })
    }
  } else {
    delete req.user
    return res.status(401).send({ message: 'Access Denied' })
  }
}
