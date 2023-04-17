import JobModel from '../Models/JobModel.js'
import User from '../Models/UserModel.js';
import mongoose from "mongoose";
import nodemailer from 'nodemailer';



                /******************SEND EMAIL****************/
async function sendEmail(to, subject, message) {

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'mouaddebyassmin1999@gmail.com', 
        pass: 'yhggpfrwqubdueta' 
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'mouaddebyassmin1999@gmail.com', // votre email ici
      to: to,
      subject: subject,
      text: message,
      html: `<b>${message}</b>`
    });
  
    console.log('Message sent: %s', info.messageId);
  }
  


                /******************ADD JOB****************/
const addJobPost = async(req,res)=>{

    try{

        const {title, location, description, salary} = req.body;
        /*# GET USER ID FROM THE TOKEN #*/
        //const author = req.user._id
        const author = req.body.author
        const checkIfUserExists = User.findById(author)
        if(!checkIfUserExists){
            throw new Error('User Not Found !')
        }

        if(salary < 0){
            throw new Error('Salary Must Be A Posistive Number !')
        }
        const Job = new JobModel({
            title, 
            location, 
            description, 
            file: req.file.filename, 
            salary, 
            author})
        const Response = await Job.save();
        const postLink = `http://localhost:3000/Post/${Response._id}`;
        const message = `You are looking for a job! A new job offer is just posted now ! <h3> ${title}.</h3>
                You can view this post by clicking on the following link: ${postLink}
                Good Luck !
                CropTrek Team.`;
        const jobSeekers = await User.find({role: 'jobSeeker'});
        jobSeekers.forEach(async (jobSeeker) => {
            const currentUser = await User.findById(author)
            if (jobSeeker.email !== currentUser.email) {
            await sendEmail(jobSeeker.email, 'New Job Offer In !', message);
            }
          });
        res.status(200).json(Response);

    }catch(error){

        res.status(500).json({message : error.message})

}
}

                /******************FIND JOB BY ID****************/
const findJobPostById = async(req, res)=>{
    try{
        const {id} = req.params;
    const findPost = await JobModel.findById(id).populate('author', 'name surname email');
        res.status(200).json(findPost);

    }catch(error){

        res.status(500).json({message : error.message})
        
}
}

                /******************UPDATE JOB****************/
const updateJobPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, file, salary } = req.body;

    const checkIfJobAuthor = await JobModel.findOne({ _id: id });
    if (!checkIfJobAuthor) {
      throw new Error("You Are Not Authorized !");
    }

    const Response = await JobModel.updateOne(
      { _id: id },
      { $set: { title, location, description, file, salary } },
      { new: true }
    );

    res.status(200).json(Response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



                /******************DELETE JOB****************/
const deleteJobPost = async (req, res)=>{

    try{

        const {id} = req.params
        //const author = req.user._id
        const author = req.body.author
        const checkIfJobAuthor = await JobModel.findOne({_id: id, author : author})
        // const checkIfUserExists = await User.findById(author)
        // if(!checkIfUserExists){
        //     throw new Error('User Not Found !')
        // }
        // const checkIfJobPostExists = await JobModel.findById(id)
        // if(!checkIfJobPostExists){
        //     throw new Error('Post Not Found !')
        // }

        // if(!checkIfJobAuthor){
        //     throw new Error('You Are Not Authorized !')
        // }

        await JobModel.findByIdAndDelete(id);
        res.status(200).json("Post Deleted Successfuly !")

    }catch(error){

        res.status(500).json({message : error.message})

    }
}                


                /******************GET ALL JOB****************/
const getAllJobPosts = async (req, res)=>{

    try{

        const jobs = await JobModel.find().populate('author', 'name surname email');

        if(!jobs || jobs.length === 0){ 

            res.status(200).json(jobs)

        }

        res.status(200).json(jobs)

    }catch(error){

        res.status(500).json({message : error.message})

    }

}  

const getAllPostsByUserId = async(req, res)=>{
    try{

        const userId = req.params.userId; 
             
        const jobs = await JobModel.find({author:userId}).populate('author', 'name surname email');

        if(!jobs || jobs.length === 0){

          return res.status(200).json(jobs); 

        }

        res.status(200).json(jobs)

    }catch(error){
         
        res.status(500).json({message : error.message})

    } 
}

                /******************UPDATE RATE JOB****************/
const updateJoRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, rating } = req.body;

    const job = await JobModel.findById(id);
    let currentRatings = job.rating;
 
    // Check if the currentRatings array exists and is not empty
    if (Array.isArray(currentRatings) && currentRatings.length > 0) {
      // Find the index of the user's existing rating in the array
      const userRatingIndex = currentRatings.findIndex((r) => r.user && r.user.toString() === userId.toString());

      if (userRatingIndex !== -1) {
        // User has already submitted a rating, so update the existing rating value
        currentRatings[userRatingIndex].value = rating;
      } else {
        // User has not yet submitted a rating, so add a new rating object to the array
        currentRatings.push({ user: userId, value: rating });
      }
    } else {
      // There are no existing ratings, so add a new rating object to the array
      currentRatings = [{ user: userId, value: rating }];
    }


    const updatedJob = await JobModel.findByIdAndUpdate(
      id,
      { $set: { rating: currentRatings } },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


                /******************COUNT RATING JOB****************/
const countRatingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let ratingCount = 0;
    const jobs = await JobModel.find({ author: userId });
    jobs.forEach(job => {
      job.rating.forEach(rating => {
          ratingCount += rating.value;
        
      });
    });
    
    res.status(200).json(ratingCount);
} catch (error) {
  res.status(500).json({ message: error.message });
}
}; 


                /******************COUNT RATED JOB****************/
const countRatingsByCurrentUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let ratingCount = 0;
    const jobs = await JobModel.find({ author: userId });

    jobs.forEach(job => {
      job.rating.forEach(rating => {
        if (rating.user.toString() === userId.toString()) {
          ratingCount ++;
        }
      });
    });

    res.status(200).json(ratingCount);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};


  

export  {
    addJobPost,
    updateJobPost,
    deleteJobPost,
    getAllJobPosts,
    getAllPostsByUserId,
    findJobPostById,
    updateJoRate,
    countRatingsByCurrentUser,
    countRatingsByUser
    
}