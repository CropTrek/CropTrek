import User from '../Models/UserModel.js'


// get Users
const getUsers=async (req,res,next)=>{

    try {
        const users=await User.find();
        if(users.length>0){
            console.log('users found');
            res.status(200).json(users);
        }
        else if(users.length==0){
            console.log('list users = 0');
        }
        else{
            throw new Error('users not found');
        }
        
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }
}
//Update USer
 const updateUser= async (req,res,next)=>{
    try {
        const {id}=req.params;
        const checkIfUJSerExists= await User.findById(id);
        if(!checkIfUJSerExists){
            throw new Error("User Not Found");
        }
        const updateUser= await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateUser);


    } catch (error) {
        res.status(500).json({message:error.message});
        
    }

   
} 
export  {updateUser,getUsers};
