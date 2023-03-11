import User from '../Models/UserModel.js'
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import moment from 'moment';
const userRegistration=asyncHandler( async (req,res,next)=>{
  const {surname,name,email,password,role,dateOfBirth,profilePhoto}= req.body;
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
  
     const user = await User.create({
      name,
      surname,
      email,
      password:hashedPassword,
      dateOfBirth,
      role,
      profilePhoto
  
     })
  console.log (user)
  if (user){
      res.status(201).json({_id:user.id, email:user.email})
  }else {
      res.status(400);
      throw new Error("User is not valid")
  }
  
  });
  //update photo 

  async function updateProfilePhoto(req, res) {
    try {
      const {userId,profilePhoto} =req.body
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: `user not found ${userId}` });
        return;
      }
      if (!profilePhoto) {
        res.status(400).json({ message: 'Veuillez indiquer votre photo de profile' });
        return;
      }  
      const profilePhotoBuffer = Buffer.from(profilePhoto, 'base64');
      
      const filePath = path.join(__dirname, '../../React Template/public/profile', `${userId}.jpg`);
      await fs.writeFile(filePath, profilePhotoBuffer);
      user.profilePhoto = `/profile/${userId}.jpg`;
      await user.save();
      res.status(200).json({ message: 'Mise a jour de photo est effectuer ' });
    } catch (error) {
      console.error('Error :', error);
      res.status(500).json({ message: 'server error' });
    }
  }

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

// // Get user by ID
// const getUserbyID = async (req, res) => {
//   try {
//     if (!req.params.id || typeof req.params.id !== 'string') {
//       throw new Error('Invalid user ID');
//     }

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       throw new Error('User not found');
//     }

//     const formattedDateOfBirth = moment(user.dateOfBirth).format('DD/MM/YYYY');

//     res.json({ ...user.toObject(), formattedDateOfBirth });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// };



const getUserbyID = asyncHandler (
  async (req,res)=>{
try {
  const user=await User.findById(req.params.id);
      
  if(user){
//     const formattedDateOfBirth = moment(user.dateOfBirth).format('DD/MM/YYYY');
console.log('====================================');
//console.log(formattedDateOfBirth);
console.log('====================================');
    res.json(user);

  }else{
      res.status(404);
      throw new Error("user not found");

  }
  
} catch (error) {
  res.status(500).json({ message: error.message });
  
}

  }
)

// app.get('/file', (req, res) => {
//   const filePath = path.resolve('./uploads/640b8be3c42a9d91fb23db92.png');
//   res.sendFile(filePath);
// });


const getImageByUserID= asyncHandler (
  async (req,res)=>{
   try {
    const user=await User.findById(req.params.id);
    
    if(user){

      //F-SocietyBackend\uploads
      //C:\Users\Mouna\Desktop\Desktop\sem2\ProjetIntegre2\CropTrek\F-SocietyBackend\uploads
      // const filePath = path.resolve(`uploads/${user._id}.png`);
      // console.log('===============11111111111111=====================');
      // console.log(filePath);
      // console.log('===============11111111111111111=====================');
      // res.sendFile(filePath);
    //   const extensions = ['png', 'jpg', 'jpeg', 'gif']; // Liste des extensions à vérifier

    //   let fileFound = false;
    //   for (let i = 0; i < extensions.length; i++) {
    //     const extension = extensions[i];
    //     const filePath = path.join(__dirname, 'uploads', `${user.id}.${extension}`);
    //     if (fs.existsSync(filePath)) { // Vérifier si le fichier existe
    //       res.sendFile(filePath);
    //       fileFound = true;
    //       break;
    //     }
    //   }
    // }else{
    //     res.status(404);
    //     throw new Error("user not found");

    // }
    
   // const userId = req.params.id;
    const extensions = ['png', 'jpg', 'jpeg', 'gif']; // Liste des extensions à vérifier
  
    let fileFound = false;

   // for (let i = 0; i < extensions.length; i++) {
    //  const extension = extensions[i];
      const filePath = path.resolve(`uploads/${user.id}.png`);
     // const filePath = path.join(__dirname, 'uploads', `${userId}.${extension}`);
        res.sendFile(filePath);
        fileFound = true;
      //  break;
      
    //}
  
   
}
else {
  res.status(404).json({ message: 'user not found' });
}
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
}
)





////////////////////////////////////////eya////////////////////////////
export  {getImageByUserID,getUserbyID,updateProfilePhoto,userRegistration,updateUser,getUsers,deleteUserPart1,deleteUserPart2,deleteUserDash,blockUser,getBlockedUsers};
