import express from "express"
const appRouter = express.Router()
import authRoute  from './AuthRoute.js'



appRouter.use('/auth', authRoute)




export default appRouter;