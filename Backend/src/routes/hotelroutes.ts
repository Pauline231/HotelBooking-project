import express from 'express'
import { upload } from '../middleware/multerconfig'
import authenticate from '../middleware/authenticate'
import { createHotel, getAllHotels, getMyHotel, getMySingleHotel, updateHotel } from '../controller/hotel/hotelcontroller'
import { asyncCatch } from '../services/errcatch'
import { body,param } from 'express-validator'
import { fetchHotelDetail } from '../controller/hotel/hoteltdetailcontroller'

const router = express.Router()

router.route('/create').post(authenticate,[
    body("name").notEmpty().withMessage('Name is required.'),
    body("city").notEmpty().withMessage('City is required.'),
    body("country").notEmpty().withMessage('Country is required.'),
    body("description").notEmpty().withMessage('Description is required.'),
    body("type").notEmpty().withMessage('Hotel type is required.'),
    body("pricePerNight").notEmpty().isNumeric().withMessage('Price per Night is required and must be number.'),
    body("facilities").notEmpty().isArray().withMessage('Faci lities are required.'),
],upload.array("imageFiles",6),asyncCatch(createHotel))

router.route('/myhotel').get(authenticate,asyncCatch((getMyHotel)))
router.route('/myhotel/:id').get(authenticate,asyncCatch((getMySingleHotel)))
                            .put(authenticate,upload.array("imageFiles",6),asyncCatch(updateHotel))  
router.route('/:id').get([
    param("id").notEmpty().withMessage('Params is required.')
],asyncCatch(fetchHotelDetail))
router.route('/').get(asyncCatch(getAllHotels))

export default router