import User from '../Models/UserModel.js'
import nodemailer from 'nodemailer';

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
export  {updateUser,getUsers,deleteUserPart1,deleteUserPart2,};
