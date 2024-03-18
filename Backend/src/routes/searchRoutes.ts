import express from 'express'
import authenticate from '../middleware/authenticate'
import { asyncCatch } from '../services/errcatch'
import { searchQuery } from '../controller/search/SearchController'

const router = express.Router()

router.route("/search").get(asyncCatch(searchQuery))

export default router