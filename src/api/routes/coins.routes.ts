import { Router } from 'express'
import { addCoin, getAllCoins, getMyCoins } from '../controllers/coins.controller'
import isAuthMiddleware from '../middlewares/isAuth.middleware'

const router = Router()

router.use(isAuthMiddleware)
router.get('/all', getAllCoins)
router.get('/mycoins', getMyCoins)
router.post('/', addCoin)

export default router
