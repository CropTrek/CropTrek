import User from '../Models/UserModel.js'
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
const userRegistration=asyncHandler( async (req,res,next)=>{
  const {surname,name,email,password,role,dateOfBirth}= req.body;
  if(!surname || !name|| !email || !password || !dateOfBirth){
      res.status(400);
      throw new Error("complete all field")
  }
  const userAvailable = await User.findOne({email})
  if (userAvailable){
      res.status(400);
      throw new Error("user already registered")
  }
  if (!["user", "farmer", "job seeker", "admin"].includes(role)) {
    
    throw new Error("Invalid role. Please choose from: user, farmer, job seeker, or admin.");
  }
  //hash 
  const hashedPassword = await bcrypt.hash(password , 10);
  
     res.json({message:"register"}) 
     const user = await User.create({
      name,
      surname,
      email,
      password:hashedPassword,
      dateOfBirth,
      role,
  
     })
  console.log (user)
  if (user){
      res.status(201).json({_id:user.id, email:user.email})
  }else {
      res.status(400);
      throw new Error("User is not valid")
  }
  
  });
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

        if (id.match(/^[0-9a-fA-F]{24}$/)) {
    
        const checkIfUJSerExists= await User.findById(id);
        if(!checkIfUJSerExists){
           console.log("User not found");
            throw new Error("User Not Found");
        }
        const updateUser= await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateUser);

    }
    } catch (error) {
        res.status(500).json({message:error.message});
        
    }

   
} 

const Test = (req, res) => {
    res.send("je suis la page test")
}


export  {Test};




// A user can Delte User after confirmation 

const deleteUserPart1= async (req,res,next)=>{

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
       // secure: false,
        auth: {
          user: 'mounaamdouni213@gmail.com',
          pass: 'fkimduvzwfwvdfxn',
        },
      });
      

    const { email } = req.body;
  
    User.findOne({ email }, function(err, user) {
      if (err) {
        res.status(500).send('Internal server error1');
        return;
      }
  
      if (!user) {
        res.status(400).send('Utilisateur introuvable');
        return;
      }
  
      user.pendingDeletion = true;
      user.save(function(err) {
        if (err) {
          res.status(500).send('Internal server error2');
          return;
        }
  
        const mailOptions = {
          from: 'mounaamdouni213@gmail.com',
          to: 'mounaamdouni213@gmail.com',
          subject: 'Demande de suppression de compte',
          text: `L'utilisateur ${email} a demandé la suppression de son compte. Connectez-vous à l'application pour approuver ou refuser cette demande.`,
        };
  
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            res.status(500).send('Internal server error3');
            return;
          }
  
          res.send('Demande de suppression de compte en attente d\'approbation');
        });
      });
    });
  };
  
  const deleteUserPart2= async (req,res,next)=>{
    const userEmail = req.query.email;
    const action = req.query.action;
  
 
    User.findOne({ email: userEmail }, function(err, user) {
      if (err) {
        res.status(500).send('erreur serveur !!!  (1)');
        return;
      }
  
      if (!user) {
        res.status(400).send('utilisateur introuvable'  );
        return;
      }
  
      if (user.pendingDeletion) {
        if (action === 'approve') {
    
          user.remove(function(err) {
            if (err) {
                res.status(500).send('erreur serveur !!!(2)');
   
              }
              res.send('Le compte utilisateur a été supprimé avec succès');
            });
          } else if (action === 'reject') {

    user.pendingDeletion = false;
    user.save(function(err) {
      if (err) {
        res.status(500).send('erreur serveur !!!(3)');

        return;
      }

      res.send('Demande de suppression de compte rejetée');
    });
  } else {
    res.status(400).send('Action invalide');
  }
} else {
  res.status(400).send('Aucune demande de suppression de compte en attente');
}
    }
    )
}
  ;


////////////////////// eya /////////////////////////////
  const deleteUserDash=async (req,res,next)=>{
    try {
      const {id} = req.params;
      const checkIfUserExist = await User.findById(id);
      if (!checkIfUserExist) {
        throw new Error("user not found!");
      }
      await User.findByIdAndDelete(id);
      res.json("user  deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const blockUser=async (req,res,next)=>{
    try {
      const { id } = req.params;
      const { accStatus  } = req.body;
      const checkIfUserExist = await User.findById(id);
      if (!checkIfUserExist) {
        throw new Error("user not found!");
      }
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: { accStatus},
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  };
  const getBlockedUsers= async(req,res,next)=>{
    try {
      
        const userList = await User.find({accStatus: false});
        if (!userList|| userList.length === 0) {
          throw new Error("users not found");
        }
        res.status(200).json(userList);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
  };



////////////////////////////////////////eya////////////////////////////
export  {userRegistration,updateUser,getUsers,deleteUserPart1,deleteUserPart2,deleteUserDash,blockUser,getBlockedUsers};
