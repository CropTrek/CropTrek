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

        const {title, location, description, salary, employees} = req.body;
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
            employees,
            author})
        const Response = await Job.save();
        const postLink = `http://localhost:3000/Post/${Response._id}`;
        const message = `You are looking for a job! A new job offer is just posted now ! <h3> ${title}.</h3>
                <h1>${description}</h1>.
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
    const { title, location, description, salary } = req.body;
    const { filename: file } = req.file;

    const checkIfJobAuthor = await JobModel.findOne({ _id: id });
    if (!checkIfJobAuthor) {
      throw new Error("You Are Not Authorized !");
    }

    const Response = await JobModel.findOneAndUpdate(
      { _id: id }, 
      { $set: { title, location, description, file,salary } },
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
const getAllJobPosts = async (req, res) => {
  try {
    const jobs = await JobModel.find().populate('author', 'name surname email').sort({createdAt: -1});

    if (!jobs || jobs.length === 0) {
      return res.status(200).json(jobs);
    }

    const postsWithTotalRates = await Promise.all(
      jobs.map(async (job) => {
        const ratingCount = await countRatingsByCurrent(job.author._id);
        return { ...job.toObject(), totalRates: ratingCount };
      })
    );

    return res.status(200).json(postsWithTotalRates);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const countRatingsByCurrent = async (userId) => {
  try {
    let ratingCount = 0;
    const jobs = await JobModel.find({ author: userId });
    jobs.forEach(job => {
      job.rating.forEach(rating => {
          ratingCount += rating.value;
        
      });
    });
    return ratingCount;
  } catch (error) {
    throw new Error(error.message);
  }
  
};


                /******************GET ALL JOBS BY USERID ****************/
const getAllPostsByUserId = async(req, res)=>{
    try{

        const userId = req.params.userId; 
             
        const jobs = await JobModel.find({author:userId}).populate('author', 'name surname email').sort({createdAt: -1});

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
    // console.log(ratingCount);
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
    const jobs = await JobModel.find();

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



                /******************ADD APPLIER TO JOB****************/
const addApplierToJob = async (req, res) => {
  try {

    const { jobId } = req.params;
    const { applierId } = req.params;

    // CHECK IF JOB EXISTS
    const job = await JobModel.findById(jobId);
    if (!job) {
      throw new Error('Job not found');
    }
    
    // CHECK IF APPLIER EXISTS
    const isApplierExists = job.appliers.some(applier => applier.applier.equals(applierId));
    if (isApplierExists) {
      throw new Error('Applier already exists for this job');
    }
    
    job.appliers.push({ applier: applierId, apply: false });
        await job.save();
    
    res.status(200).json('Applier added to job successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

                /******************APPLIERS LIST****************/
const getAppliesCount = async (applierId) => {
  try {
    const jobs = await JobModel.find({ "appliers.applier": applierId });

    let totalApplies = 0;
    jobs.forEach((job) => {
      totalApplies +=
        job.appliers.filter(
          (applier) =>
            applier.applier.toString() === applierId.toString() && applier.apply === true
        ).length;
    });

    let ratingCount = 0;
    jobs.forEach((job) => {
      const applier = job.appliers.find((applier) => applier.applier.toString() === applierId.toString());
      if (applier && applier.apply) {
        job.rating.forEach((rating) => {
          ratingCount += rating.value;
        });
      }
    });

    return { totalApplies, ratingCount };
  } catch (error) {
    throw new Error(error.message);
  }
};

const appliersPerJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await JobModel.findById(jobId).populate('appliers.applier');

    const appliers = job?.appliers || []; 

    if (appliers.length === 0) {
      return res.status(200).json({ message: 'No appliers found for this job' });
    }

    // Get applies count for each applier
    const appliersWithAppliesCount = await Promise.all(appliers.map(async (applier) => {
      const appliesCount = await getAppliesCount(applier.applier._id);
      return {
        ...applier.toObject(),
        appliesCount,
      };
    }));

    res.status(200).json({ appliers: appliersWithAppliesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



                /******************REMOVE APPLIER DEMAND****************/
const removeApplier = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { applierId } = req.params;

    const job = await JobModel.findOneAndUpdate(
      { _id: jobId },
      { $pull: { appliers: { applier: applierId } } },
      { new: true }
    ).populate('appliers.applier');

    if (job) {
      const updatedAppliers = job.appliers.filter(
        (applier) => applier.apply === true
      );
      res.status(200).json(updatedAppliers);
    } else {
      console.log("Job not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



                /******************ACCEPT APPLIER****************/
const acceptApplier = async (req, res) => {
  const { jobId, applierId } = req.params;
  const {email}= req.body

  try {
    const job = await JobModel.findById(jobId);
    const applier = job.appliers.find((applier) => applier.applier.toString() === applierId);

    if (!applier) {
      return res.status(404).json({ message: 'Applier not found for this job' });
    }

    applier.apply = true;
    console.log(applier);
    await job.save();
    console.log(email);
   
    const message = `Your candidate has been selected for the position. We will contact you soon for the rest of the recruitment process.<p>Votre ID d\'appel est : </p>. <p>Cliquez sur le lien suivant pour rejoindre l\'appel à 15h : <a href="https://localhost:3000/Test3">Link</a></p>`

    await sendEmail(email, 'Candidate\'s Confirmation', message);

    res.status(200).json({ message: 'Apply updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the apply status' });
  }
};


                /******************ADD TO PREFERENCE****************/
const addToPreference = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.params;

    // Retrieve the job by its ID
    const job = await JobModel.findById(jobId);

    // Check if the user is already in the preferences list
    if (job.preferences.some(preference => preference.user.toString() === userId)) {
      return res.status(400).json({ message: 'User already in preference array' });
    }

    // Add the user to the preferences list
    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $addToSet: { preferences: { user: userId } } },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


                /******************REMOVE FROM PREFERENCE****************/
const removeFromPreference = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.params;

    const job = await JobModel.findById(jobId);

    if (job.preferences.some(preference => preference.user.toString() === userId)) {
     
    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $pull: { preferences: { user: userId } } },
      { new: true }
    );

    res.status(200).json(updatedJob);
    }
    else {
      return res.status(400).json({ message: 'User not in preference array' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

                /******************GET USER PREFERENCES****************/
const getJobsByUserPreference = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await JobModel.aggregate([
      { $unwind: '$preferences' }, // Déplier la liste des préférences pour chaque travail
      { $match: { 'preferences.user': mongoose.Types.ObjectId(userId) } }, // Rechercher les travaux avec l'ID utilisateur correspondant
    {
        $lookup: {
          from: 'users', // the name of the collection to join with
          localField: 'author', // the field in the current collection
          foreignField: '_id', // the field in the joined collection
          as: 'authorDetails', // the name of the output field
        },
      },
      { $unwind: '$authorDetails' }, // flatten the authorDetails array
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          salary: 1,
          location: 1,
          author: 1,
          file:1,
          authorDetails: {
            _id: 1,
            name: 1,
            surname:1,
            email: 1,
          },
        },
      },
    ]);

    return res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAppliedJobs = async (req, res) => {
  try {
    const { applierId } = req.params;
    const jobs = await JobModel.find({ "appliers.applier": applierId })
      .populate("author", "username email surname name");

    const appliedJobs = [];

    jobs.forEach((job) => {
      const applier = job.appliers.find((applier) => applier.applier.toString() === applierId.toString());
      if (applier && applier.apply) {
        appliedJobs.push(job);
      }
    });

    return res.status(200).json(appliedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPendingJobs = async (req, res) => {
  try {
    const { applierId } = req.params;
    const jobs = await JobModel.find({ "appliers.applier": applierId })
      .populate("author", "username email surname name");

    const appliedJobs = [];

    jobs.forEach((job) => {
      const applier = job.appliers.find((applier) => applier.applier.toString() === applierId.toString());
      if (applier && !applier.apply) {
        appliedJobs.push(job);
      }
    });

    return res.status(200).json(appliedJobs);
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
    countRatingsByUser,
    addApplierToJob,
    appliersPerJob,
    removeApplier,
    getAppliesCount,
    acceptApplier,
    addToPreference,
    removeFromPreference,
    getJobsByUserPreference,
    getAppliedJobs,
    getPendingJobs
    
}