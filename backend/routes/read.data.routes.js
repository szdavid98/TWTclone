import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import {recieveDataReader} from '../controllers/read.controller.js'
const router = express.Router()


router.post("/log",  recieveDataReader);


export default router