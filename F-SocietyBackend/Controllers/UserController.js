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
import jwt from 'jsonwebtoken'
import twilio from 'twilio'

const accountSid = 'AC480cfaa65d7ffdd69913c9033a67470e';
const authToken = '504fd36f192f6a77545fc95acbaef5fe';
const client = twilio(accountSid, authToken);

const comparePassword = User.comparePassword;
const userRegistration=asyncHandler( async (req,res,next)=>{
  const {surname,name,email,password,role,dateOfBirth,adresse,phoneNumber}= req.body;

  if(!surname || !name|| !email || !password || !dateOfBirth){
      res.status(400);
      throw new Error("complete all field")
  }
  const userAvailable = await User.findOne({email})
  if (userAvailable){
      res.status(400);
      throw new Error("user already registered")
  }
  if (!["farmer", "jobSeeker", "supplier"].includes(role)) {
    
    throw new Error("Invalid role. Please choose from: farmer, jobSeeker, or supplier.");
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



      phoneNumber,
      adresse,




  
     })
     // mouna zedetha bech ywalli yekhou par defut taswira 
    //  const profilePhotoBuffer = Buffer.from(profilePhoto, 'base64');
    //  const filePath = path.join(__dirname, '../uploads/userProfile.png');
    //   await fs.writeFile(filePath, profilePhotoBuffer);
    //   user.profilePhoto = `../uploads/userProfile.png`;

    //  user.save()
  console.log (user)
  if (user){
      res.status(201).json({_id:user.id, email:user.email, profilePhoto:user.profilePhoto})
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

const generateVerificationCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

// Fonction pour envoyer un e-mail avec le code de vérification
const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
   // secure: false,
    auth: {
      user: 'mounaamdouni213@gmail.com',
      pass: 'fkimduvzwfwvdfxn',
    },
  });
  

  const mailOptions = {
    from: 'mounaamdouni213@gmail.com',
    to: email,
    subject: 'Code de vérification',
    text: `Votre code de vérification est ${code}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail sent');
  } catch (error) {
    console.log('E-mail sending failed');
    throw new Error('E-mail sending failed');
  }
};



//

const verifUpdateMail=async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.email !== email) {
      throw new Error('Merci de vérifier votre email');
    }


    const verificationCode = generateVerificationCode();
    await sendVerificationEmail(email, verificationCode);

  
    user.verificationCode = verificationCode;
    await user.save();

    res.status(200).json({ message: 'le code est envoyé! Verifiez votre boite mail svp!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// houni chenbaddel l user + verification du Code
const updateUser= async (req,res,next)=>{
  try {
    const { id } = req.params;
    const { email, verificationCode, ...update } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.email !== email) {
      throw new Error('E-mail address does not match');
    }

    if (user.verificationCode !== verificationCode) {
      throw new Error('Invalid verification code');
    }

  
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route pour demander la modification de compte avec envoi de code de vérification









//   const updateUser= async (req,res,next)=>{
//      try {   
//           const {id}=req.params;

//          if (id.match(/^[0-9a-fA-F]{24}$/)) {
    
//          const checkIfUJSerExists= await User.findById(id);
//          if(!checkIfUJSerExists){
//             console.log("User not found");
//              throw new Error("User Not Found");
//          }
//          const updateUser= await User.findByIdAndUpdate(id,req.body,{new:true});
//          res.status(200).json(updateUser);

//      }
//      } catch (error) {
//          res.status(500).json({message:error.message});
        
//      }

   
//  } 

// const updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     if (id.match(/^[0-9a-fA-F]{24}$/)) {
//       const user = await User.findById(id);
//       if (!user) {
//         console.log("User not found");
//         throw new Error("User Not Found");
//       }

//       // Generate a random code and send it to the user's email
//       const verificationCode = Math.floor(100000 + Math.random() * 900000);
//       const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 587,
//        // secure: false,
//         auth: {
//           user: 'mounaamdouni213@gmail.com',
//           pass: 'fkimduvzwfwvdfxn',
//         },
//       });
//       const mailOptions = {
//         from: 'mounaamdouni213@gmail.com',
//           // to: 'mounaamdouni213@gmail.com',
//         to: user.email,
//         subject: 'Code de vérification pour mise à jour de profil',
//         text: `Votre code de vérification est : ${verificationCode}`,
//       };
//       await transporter.sendMail(mailOptions);

//       // Wait for the user to enter the verification code
//       const { code } = await new Promise((resolve) => {
//         req.on('data', (data) => {
//           const body = JSON.parse(data.toString());
//           resolve(body);
//         });
//       });

//       // Verify the code and update the user's information
//       if (code !== verificationCode) {
//         res.status(400).json({ message: 'Code de vérification invalide' });
//         return;
//       }

//       const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
//       res.status(200).json(updatedUser);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }


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
        res.status(500).json('Internal server error1');
        return;
      }
  
      if (!user) {
        res.status(400).json('Utilisateur introuvable');
        return;
      }
  
      user.pendingDeletion = true;
      user.save(function(err) {
        if (err) {
          res.status(500).json('Internal server error2');
          return;
        }
 // const APPROVE_URL='http://localhost:5000/api/users2/approve-account-deletion?email=vv&action=approve'
        const mailOptions = {
          from: 'mounaamdouni213@gmail.com',
          to: 'mounaamdouni213@gmail.com',
          subject: 'Demande de suppression de compte',
          html: `
            <p>L'utilisateur ${email} a demandé la suppression de son compte. Cliquez sur le bouton ci-dessous pour approuver ou rejeter cette demande.</p>
            <div style="display: flex; flex-direction: row;">
              <a href="http://localhost:5000/api/users2/approve-account-deletion?email=${email}&action=approve" style="margin-right: 16px; padding: 8px 16px; background-color: green; color: white; text-decoration: none;">Approuver</a>
              <a href="http://localhost:5000/api/users2/approve-account-deletion?email=${email}&action=reject" style="padding: 8px 16px; background-color: red; color: white; text-decoration: none;">Rejeter</a>
           <br/> <br></br>
          
              </div>
              <h5><i>CropTrek</i> .</h5>
          `,
        };
  
        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            res.status(500).send('Internal server error3');
            return;
          }
  
          res.json('Demande de suppression de compte en attente d\'approbation');
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


// get Email Address lel verification raw l mail deja utilisé 


const verifemail=async (req, res,next) => {
  try {

    const users = await User.find();

    // nestaamle l  map bech nextracti juste ken les emails khw
    const usedEmail = users.map((user) => user.email);

   // houni nab3eth tableau // .json bech nab3eth sous format json  
    res.send(usedEmail);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreurs");
  }
}




       /******************FIND USER BY EMAIL AND BLOCK*********************/
       const FindUserByEmailAndBlock=async (req,res)=>{
        try {
          
          const email = req.body.email
          const findUser = await User.findOne({email})
          if (!findUser) {
            return res.status(401).json({message : 'USER NOT FOUND !'})
          }
          findUser.accStatus =false;
          const updatedUser = await findUser.save();
          res.status(200).json(updatedUser);
          
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      
      };
      
              /******************EMAIL ATTEMPTS CONNEXION*********************/
      
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'mouaddebyassmin1999@gmail.com', // your email address
            pass: 'yhggpfrwqubdueta' // your email password
        }
      });
      
      // send mail with defined transport object
      function sendEmail(to, subject, body, phoneNumber, callback) {
        const secretCode="yx9TUnTIA^luh&M6z82epT8*NaPg^xBWD!KpDtR&jp2CNeexK&"
        const token = jwt.sign({ email: to }, secretCode, { expiresIn: '1h' });
      
        const mailOptions = {
            from: 'mouaddebyassmin1999@gmail.com', // sender address
            to, // list of receivers   
            subject, // Subject line
            html: `
                  <p>${body}</p>
                  <h1>We locked your account momentarily for security reasons.</h1>
                  <h3>Is it you trying to recover your account ?</h3>
                  <a href="http://localhost:3000/Validation/?token=${token}"  onclick="sendVerificationCode(${phoneNumber})"><button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; border-radius: 12px; font-size: 16px; margin: 4px 2px; cursor: pointer;">GET A CODE ON YOUR PHONE</button><a/>
              ` 
        };
      
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response+token);
                sendVerificationCode(phone)
                callback(token);
            }
        });
      }       

      const verificationCodes = {}; // object to store verification codes and their expiration time

      function sendVerificationCode(to, res) {
        const code = generateVerificationCodeSMS(); // generate a random verification code
        const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
        const expiresAt = Date.now() + expirationTime; // calculate the expiration time
        
        verificationCodes[to] = { code, expiresAt }; // store the verification code and expiration time for the phone number
        
        client.messages
          .create({
            body: `Your verification code is ${code}`,
            from: '+15077075709',
            to: `+216${to}`, // user's phone number, retrieved from req.body
          })
          .then(message => {console.log(message.sid)
            res.json(verificationCodes.code );
          })
            .catch(error => {
              console.error(error);
              res.status(500).json({ message: 'Failed to send verification code' });
            });
      }
      
      function isValidVerificationCode(phoneNumber, code) {
        const verificationCode = verificationCodes[phoneNumber];
      
        if (verificationCode.code !== code) {
          // verification code is incorrect
          return false;
        }
      
        if (Date.now() > verificationCode.expiresAt) {
          // verification code has expired
          return false;
        }
      
        // verification code is correct and has not expired
        return true;
      }


              function generateVerificationCodeSMS() {
                const code = Math.floor(Math.random() * 900000) + 100000;
                return code.toString();
              }


                /******************TURN ON AVAILABILITY****************/
const turnOnAvailability = async (req, res) => {
  try {
    const {userId}=req.params
    const on = await User.findByIdAndUpdate(userId,
      { $set: { availability: true } },
      { new: true });
    res.status(200).json(on);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

                /******************TURN OFF AVAILABILITY****************/
const turnOffAvailability = async (req, res) => {
  try {
    const {userId}=req.params
    const off = await User.findByIdAndUpdate(userId,
      { $set: { availability: false } },
      { new: true });
    res.status(200).json(off);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

                /******************AVAILABILE USERS****************/
const getWithAvailability = async (req, res) => {
  try {
    const count = await User.countDocuments({ availability: { $exists: true, $eq: true } });
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllAddresses = async (req, res, next) => {
  try {
    const users = await User.find({}, { name: 1, surname: 1, 'adresse.coordinates': 1, 'adresse.fullAdresse': 1, _id: 0 });
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

////////////////////////////////////////eya////////////////////////////
export  {getAllAddresses,generateVerificationCodeSMS,isValidVerificationCode,verifUpdateMail,verifemail,getImageByUserID,getUserbyID,updateProfilePhoto,userRegistration,updateUser,getUsers,deleteUserPart1,deleteUserPart2,deleteUserDash,blockUser,getBlockedUsers, FindUserByEmailAndBlock, sendEmail, sendVerificationCode, turnOnAvailability, turnOffAvailability, getWithAvailability};
