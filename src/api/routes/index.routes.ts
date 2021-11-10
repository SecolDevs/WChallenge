import { Router } from 'express'
import { indexMessage } from '../controllers/index.controller'

const router = Router()

router.get('/', indexMessage)

export default router
