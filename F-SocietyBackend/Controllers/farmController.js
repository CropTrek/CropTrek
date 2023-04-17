import farmModel from "../Models/FarmModel.js";
import userModel from "../Models/UserModel.js";
import { spawn } from 'child_process';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv' ;
dotenv.config();
const getFarms= async(req,res,next)=>{
    try {
        const farmList = await farmModel.find();
        if (!farmList|| farmList.length === 0) {
          throw new Error("farms not found");
        }
        res.status(200).json(farmList);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
};
const getFarmById= async(req,res,next)=>{
  try { const { id } = req.params;
      const farm = await farmModel.findById(id);
      if (!farm) {
        throw new Error("farm not found");
      }
      res.status(200).json(farm);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 
};
const getUsersFarmers=async (req,res)=>{
  try {
    const farms = await farmModel.find();
    const userIds = farms.map(farm => farm.user);
    res.send(userIds);
  } catch (error) {
    res.status(500).send(error);
  }
}
const getFarmsByUser = async(req, res, next) => {
  try {
    const { idUser } = req.params;
    const farmList = await farmModel.find({user: idUser});
    if (!farmList|| farmList.length === 0) {
      return res.status(404).json({ message: "farm not found" });
    }
    return res.status(200).json(farmList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const existFarm = async(req, res, next) => {
  try {
    const { idUser } = req.params;
    const farmList = await farmModel.find({user: idUser});
    if ( farmList.length === 0) {
      return res.status(404).json(false);
    }
    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getFarmByOneUser = async(req, res, next) => {
  try {
    const { idUser } = req.params;
    const farm = await farmModel.findOne({user: idUser});
    if (!farm) {
      return res.status(404).json({ message: "farm not found" });
    }
    return res.status(200).json(farm);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verifyCertification = (imagePath,text) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['C:/Users/MSI/Pictures/Diseases/propriete.py', imagePath , text]);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.log(result)
      if (result.trim() === 'yes') { // suppression des espaces blancs et des sauts de ligne
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};




const addFarm = async (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "haweswebsite@gmail.com",
      pass: "lmsevtndtdqutlbw",
    },
  });
  try {
    
    const certification=req.file.path;
   
  
    const { user, name, farmingType,  country, employees,  area, soilType  } =req.body;
    const crops = JSON.parse(req.body.crops);
    if (!certification) {
      return res.status(404).json({ success: false, message: "File path is required for certification verification" });
    }
  
  
   
    if (!user || !name || !farmingType  || !crops ||!country || !employees || !area || !soilType) {
      return res.status(404).json({ success: false, message: "All required fields must be completed" });
    }

    // Vérifier que les valeurs numériques sont supérieures à zéro
    if (area <= 0 || employees <  0) {
      return res.status(404).json({ success: false, message: "Area and number of employees must be greater or equal to zero" });
    }
    const userSearched = await userModel.findById(user);
    if(!userSearched ){
      return res.status(404).json({ success: false, message: "User is not defined " });
    }
    const certificationVerified = await verifyCertification(certification, `${userSearched.name} ${userSearched.surname}`);

    console.log(certificationVerified);
    if(certificationVerified==true){
      let mailOptions = {
        from: "haweswebsite@gmail.com",
        to:  userSearched.email,
        subject: 'Decision regarding your farm',
        text: 'Your farm has been added succefully',
        html: `<p>Welcome</p>
               <p>Dear ${userSearched.name} ${userSearched.surname},

               We are pleased to inform you that your farm has been successfully added . Thank you for your interest in our platform, and we look forward to working with you to promote sustainable agriculture.
               
            
               
               If you have any questions or concerns, please do not hesitate to contact us. Thank you for your contribution to our mission, and we wish you all the best with your farming endeavors.
               
               Best regards,
             </p>`
      };
      const farmA = new farmModel({
        user,
        name,
        farmingType,
        crops,
        country,
        employees,
        area,
        soilType,
        status:true,
        certification:certification
      
      });
  
      const addedFarm = await farmA.save();
      if(addFarm){
      res.status(200).json({ success: true, message: "Farm successfully added", data: addedFarm });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ message: 'Thank you for your confidence, your request is in progress! You will receive an mail for the confirmation' });
        }
      });



      }
      else
      res.status(500).json({  message: "Farm can not be  successfully added"});
     
    }
    let mailOptions = {
      from: "haweswebsite@gmail.com",
      to:  userSearched.email,
      subject: 'Decision regarding your farm',
      text: 'Your farm has been added succefully ',
      html: `<p>Welcome</p>
             <p>Dear ${userSearched.name} ${userSearched.surname},

             Sorry but  your farm has not been added . Thank you for your interest in our platform, and we look forward to working with you to promote sustainable agriculture.
             
             Please note that your farm's status will depend on the verification of its certification. If the certification is verified, your farm will be added .
             Please provide us with the file verification and join us again :) 
             
             If you have any questions or concerns, please do not hesitate to contact us. Thank you for your contribution to our mission, and we wish you all the best with your farming endeavors.
             
             Best regards,
           </p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ success: true, message: 'Thank you for your confidence, your request is in progress! You will receive an mail for the confirmation' });
      }
    });

    
  } catch (error) {
    res.status(500).json({  message: error.message });
  }
};

const deleteFarm=async (req,res,next)=>{
  try {
    const {id} = req.params;
    const checkIfFarmExist = await farmModel.findById(id);
    if (!checkIfFarmExist) {
      throw new Error("farm not found!");
    }
    await farmModel.findByIdAndDelete(id);
    res.status(200).json({mesage : "farm  deleted"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFarmByUser=async (req,res,next)=>{
  try {
    const {id} = req.params;
    const checkIfFarmExist = await farmModel.findOne({user: id});
    if (!checkIfFarmExist) {
   
      res.status(404).json({ success: false ,message:" farm not found" });
    }
    await farmModel.findOneAndDelete(id);
    res.status(200).json({ success: true ,message :"farm  deleted"});
  } catch (error) {
    res.status(500).json({ success: false ,message: error.message });
  }
};
const updateFarm=async (req,res,next)=>{
  try {
    const { id } = req.params;
    const {user, name, farmingType, crops, country, employees,  area, soilType } = req.body;
    const checkIfFarmExist = await farmModel.findById(id);
    if (!checkIfFarmExist) {
      throw new Error("farm not found!");
    }

    if (!user || !name || !farmingType || !crops || !country || !employees || !area || !soilType) {
      return res.status(404).json({ success: false, message: "All required fields must be completed" });
    }

    // Vérifier que les valeurs numériques sont supérieures à zéro
    if (area <= 0 || employees <  0) {
      return res.status(404).json({ success: false, message: "Area and number of employees must be greater or equal to zero " });
    }
    const updatedFarm = await farmModel.findOneAndUpdate(
      {  _id: id, },
      {
        $set: {user, name,farmingType,crops, country,employees,area,soilType },
      },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Farm successfully added", data: updatedFarm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }




};
export {
    
    getFarms,
    addFarm,
    deleteFarm,
    updateFarm,
    getFarmsByUser,
    getFarmByOneUser,
    deleteFarmByUser,
    getUsersFarmers,
    existFarm,
    getFarmById
  
}