import express from 'express';
const router = express.Router();

import LogIn from "../Controllers/Authentication.js"
import { getWithAvailability } from '../Controllers/UserController.js';


router.post('/login', LogIn);
router.get('/', getWithAvailability)

export default router ;     
