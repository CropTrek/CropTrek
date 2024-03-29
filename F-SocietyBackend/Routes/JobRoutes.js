import express from "express";
import {acceptApplier, addApplierToJob, addJobPost, addToPreference, appliersPerJob, countRatingsByCurrentUser, countRatingsByUser, deleteJobPost, findJobPostById, getAllJobPosts, getAllPostsByUserId, getAppliedJobs, getAppliersRequestsList, getAppliesCount, getJobsByUserPreference, getPendingJobs, removeApplier, removeFromPreference, updateJoRate, updateJobPost} from '../Controllers/JobController.js'
import multer from 'multer'
import path from 'path'
import { addToHistory } from "../Controllers/UserController.js";

const router = express.Router()

const storage = multer.diskStorage({
    destination : "./public/uploads",
    filename : function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage,
limits:{fileSize:5000000},
fileFilter: function(req, file, cb){
    checkFileType(file, cb)
}})

function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images only!");
    }
  }



router.post('/addJobPost', upload.single('file'),addJobPost)
router.put('/updateJobPost/:id',upload.single('file'), updateJobPost)
router.delete('/deleteJobPost/:id', deleteJobPost)
router.get('/getJobPosts', getAllJobPosts)
router.get('/getAllPostsByUserId/:userId', getAllPostsByUserId)
router.get('/findJobPostById/:id', findJobPostById) 
router.put('/updateJoRate/:id', updateJoRate)
router.get('/countRatingsByCurrentUser/:userId', countRatingsByCurrentUser)
router.get('/countRatingsByUser/:userId', countRatingsByUser)
router.put('/addApplierToJob/:jobId/:applierId', addApplierToJob)
router.get('/appliersPerJob/:jobId', appliersPerJob) 
router.delete('/removeApplier/:jobId/:applierId', removeApplier)
router.put('/acceptApplier/:jobId/:applierId', acceptApplier)  
router.put('/addToPreference/:jobId/:userId', addToPreference)
router.delete('/removeFromPreference/:jobId/:userId', removeFromPreference) 
router.get('/getJobsByUserPreference/:userId', getJobsByUserPreference)
router.get('/getAppliedJobs/:applierId', getAppliedJobs)
router.get('/getPendingJobs/:applierId', getPendingJobs)
router.get('/getAppliersRequestsList/:authorId', getAppliersRequestsList)

/*********HISTORY ROUTE*********/
router.post('/addToHistory/:userId', addToHistory)     


export default router;    