import CommentModel from "../Models/CommentModel.js";
import Job from "../Models/JobModel.js";
import User from "../Models/UserModel.js";

                /******************ADD COMMENT****************/
const addJobPostComment = async (req, res) => {
  try {
    const { comment, author, job } = req.body;

    /*# GET USER ID FROM THE TOKEN #*/
    const checkIfUserExists = await User.findById(author);
    if (!checkIfUserExists) {
      throw new Error('User Not Found !');
    }

    const checkIfJobExists = await Job.findById(job);
    if (!checkIfJobExists) {
      throw new Error('Job Not Found !');
    }

    const Comment = new CommentModel({
      comment,
      author,
      job,
    });

    const Response = await Comment.save();
    res.status(200).json(Response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



                                /******************UPDATE COMMENT****************/
const updateJobPostComment = async(req, res)=>{

    try{

        const {comment} = req.body;
        /*# GET USER ID FROM THE TOKEN #*/
        //const author = req.user._id
        const author = req.body.author
        const job = req.body.job
        const checkIfUserExists = User.findById(author)
        if(!checkIfUserExists){
            throw new Error('User Not Found !')
        }
        const checkIfJobExists = Job.findById(job)
        if(!checkIfJobExists){
            throw new Error('Job Not Found !')
        }

        const checkIfCommentAuthor = await CommentModel.findOne({_id: id, author : author})
        if(!checkIfCommentAuthor){
            throw new Error('You Are Not Authorized !')
        }

        const Response = await CommentModel.findByIdAndUpdate(

            id,
            {$set : {comment, job, author}},
            {new : true}

        )

        res.status(200).json(Response);

    }catch(error){

        res.status(500).json({message : error.message})

}
}


                /******************DELETE COMMENT****************/
const deleteJobPostComment = async (req, res)=>{

    try{

        const {id} = req.params
        /*# GET USER ID FROM THE TOKEN #*/
        //const author = req.user._id
        const author = req.body.author
        const job = req.body.job
        const checkIfUserExists = User.findById(author)
        if(!checkIfUserExists){
            throw new Error('User Not Found !')
        }
        const checkIfJobExists = Job.findById(job)
        if(!checkIfJobExists){
            throw new Error('Job Not Found !')
        }

        // const checkIfCommentAuthor = await CommentModel.findOne({_id: id, author : author})
        // if(!checkIfCommentAuthor){
        //     throw new Error('You Are Not Authorized !')
        // }

        await CommentModel.findByIdAndDelete(id);
        res.status(200).json("Comment Deleted Successfuly !")

    }catch(error){

        res.status(500).json({message : error.message})

    }
}  

                /******************GET ALL JOB COMMENTS****************/
const getAllJobComments = async(req, res)=>{
    const postId = req.params.postId;
   
    try {      

      const post = await Job.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      const comments = await CommentModel.find({ job: postId }).populate({
        path: 'author',
        select: '_id name surname email',
      });
  
      res.status(200).json(comments);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Server Error' });
    }
}

export {
    addJobPostComment,
    updateJobPostComment,
    deleteJobPostComment,
    getAllJobComments
}