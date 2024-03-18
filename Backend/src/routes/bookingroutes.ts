import express from 'express'
import authenticate from '../middleware/authenticate'
import { asyncCatch } from '../services/errcatch'
import { createBooking, fetchMyBookings } from '../controller/booking/Bookingcontroller'

const router = express.Router()

router.route('/create-booking/:id').post(authenticate,asyncCatch(createBooking))
router.route('/').get(authenticate,asyncCatch(fetchMyBookings))

export default router