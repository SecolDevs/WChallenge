import { Router } from 'express'
import { check } from 'express-validator'
import { login, register } from '../controllers/auth.controller'

const router = Router()

router.post(
  '/register',
  [
    check('firstName', 'fistName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'password must contain only letters and numbers').isAlphanumeric(),
    check('password', 'password must be longer than 8 characters').isLength({ min: 8 }),
    check('favouriteCurrency', 'favouriteCurrency is required').not().isEmpty(),
  ],
  register
)
router.post(
  '/login',
  [
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
  ],
  login
)

export default router
