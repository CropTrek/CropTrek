import express from "express"
const appRouter = express.Router()
import authRoute  from './AuthRoute.js'
import jobRoute from './JobRoutes.js'
import commentRoute from './CommentRoutes.js'

/*********AUTHENTICATION ROUTES*********/
appRouter.use('/auth', authRoute)

/*********JOB POST ROUTES*********/
appRouter.use('/job', jobRoute)

/*********JOB POST COMMENT ROUTES*********/
appRouter.use('/comment', commentRoute)  

export default appRouter;