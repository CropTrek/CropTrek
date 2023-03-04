import express from "express"
const appRouter = express.Router()
import authRoute  from './AuthRoute.js'
import user from './user.js'



appRouter.use('/auth', authRoute)




export default appRouter;