import express from "express";
import {addApplierToJob, addJobPost, appliersPerJob, countRatingsByCurrentUser, countRatingsByUser, deleteJobPost, findJobPostById, getAllJobPosts, getAllPostsByUserId, getAppliesCount, removeApplier, updateJoRate, updateJobPost} from '../Controllers/JobController.js'
import multer from 'multer'
import path from 'path'

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
router.get('/getAppliesCount/:applierId', getAppliesCount)

export default router;    