import { Router } from 'express'
import { check } from 'express-validator'
import { addFavouriteCoin, getAllCoins, getFavouriteCoins } from '../controllers/coins.controller'
import isAuthMiddleware from '../middlewares/isAuth.middleware'

const router = Router()

router.use(isAuthMiddleware)
router.get('/all', getAllCoins)
router.get('/favourite', getFavouriteCoins)
router.post('/favourite', [check('coinId', 'coinId is required').not().isEmpty()], addFavouriteCoin)

export default router
