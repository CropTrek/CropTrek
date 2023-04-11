import express from "express";
import { addJobPostComment, deleteJobPostComment, getAllJobComments, updateJobPostComment } from "../Controllers/CommentController.js";


const router = express.Router()


router.post('/addJobPostComment', addJobPostComment)
router.put('/updateJobPostComment', updateJobPostComment)
router.delete('/deleteJobPostComment/:id', deleteJobPostComment)
router.get('/posts/:postId', getAllJobComments);



export default router;