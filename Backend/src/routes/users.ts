import express,{Request,Response} from 'express'
import {asyncCatch} from '../services/errcatch'
import { LogOut, fetchUser, loginUser, registerUser } from '../controller/auth/authcontroller'
import { check } from 'express-validator'
import authenticate from '../middleware/authenticate'

const router = express.Router()

router.route('/register').post([
    check("email",'email is required').isString(),
    check("password","password should be of minimum 8 characters").isLength({min:8})
],asyncCatch(registerUser))

router.route('/login').post([
    check("email","email is required").isEmail(),
    check('password',"password should be of minimum 8 characters").isLength({min : 8})
],asyncCatch(loginUser))

router.get('/validate-token', authenticate, (req:Request, res:Response)=>{
    res.status(200).json({
        message : "user authenticated ",
        data : {userId : req.userId}
    })
} )

router.route('/logout').post(asyncCatch(LogOut))
router.route('/getUser').get(authenticate,asyncCatch(fetchUser))

export default router