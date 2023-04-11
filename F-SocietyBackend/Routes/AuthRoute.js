import express from 'express';
const router = express.Router();

import LogIn from "../Controllers/Authentication.js"

router.post('/login', LogIn);


export default router ;     