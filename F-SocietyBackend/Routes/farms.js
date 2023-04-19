import  express  from "express";

import {getFarms,addFarm, deleteFarm,updateFarm , getFarmsByUser,getFarmByOneUser,deleteFarmByUser,getUsersFarmers,existFarm,getFarmById,cropRegression} from '../Controllers/farmController.js';
import {addTree, getTrees,deleteTree,getInfoFile,getCropById} from '../Controllers/TreeController.js';
import fs from 'fs';
import multer from 'multer';
import { spawn } from 'child_process';
import cron from 'node-cron';




const farmsRoutes = express.Router();


const storageTree = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/MSI/Documents/GitHub/CropTrek/F-SocietyBackend/uploads/JsonFile');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const uploadTree = multer({
  storage: storageTree,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(json)$/)) {
      return cb(new Error('Only JSON files are allowed!'))
    }
    cb(null, file);
  }
});
const storageVerification = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/verifImage')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const uploadVerification = multer({ storage: storageVerification})
// Définir la tâche cron pour exécuter la route chaque mois
cron.schedule('0 0 1 * *', () => {
  farmsRoutes.post('/addTree', addTree); 
});



farmsRoutes.post('/getInfoFile', uploadTree.single("file"),getInfoFile); 
farmsRoutes.get('/getUsersFarmers', getUsersFarmers); 
farmsRoutes.get('/getFarms', getFarms); 
farmsRoutes.get('/getFarmById/:id', getFarmById); 
farmsRoutes.get('/getFarmsByUser/:idUser', getFarmsByUser); 
farmsRoutes.get('/getFarmByUser/:idUser', getFarmByOneUser); 
farmsRoutes.get('/existFarm/:idUser', existFarm); 
farmsRoutes.post('/addFarm',uploadVerification.single('file'), addFarm); 
farmsRoutes.delete('/deleteFarm/:id', deleteFarm); 
farmsRoutes.delete('/deleteFarmByUser/:id', deleteFarmByUser); 
farmsRoutes.put('/updateFarm/:id', updateFarm); 
farmsRoutes.post('/cropReg', cropRegression); 

farmsRoutes.get('/getCrop/:id', getCropById); 
farmsRoutes.get('/getTrees', getTrees); 
farmsRoutes.delete('/deleteTree/:id', deleteTree); 

// Configurer le middleware de multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/Diseases')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })


farmsRoutes.post("/upload", upload.single("image"), (req, res) => {
  try {
    const filePath = req.file.path;
    res.status(200).json({ success: true, path: filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});




farmsRoutes.post('/diseaseDetect',async(req,res)=>{
  const imagePath = req.body.imagePath;
  try{
    const pythonProcess = spawn('python', ['C:/Users/MSI/Pictures/Diseases/getDisease.py', imagePath]);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      res.json({result: result});
    });

   
  }
  catch(error){
    res.status(500).json({error : error})
  }
});







farmsRoutes.get('/scrapingData', async(req, res) => {



      fs.readFile('C:/Users/MSI/Pictures/Diseases/dataFarm.json', (err, data) => {
        if (err) throw err;
        const dataArray = JSON.parse(data);
        res.json(dataArray);});
   

   
});
cron.schedule('0 0 1 * *', () => {
farmsRoutes.get('/miseAJourScrapingData', async(req, res) => {



  try{
    const pythonProcess = spawn('python', ['C:/Users/MSI/Pictures/Diseases/getFarmData.py']);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      fs.readFile('C:/Users/MSI/Pictures/Diseases/dataFarm.json', (err, data) => {
        if (err) throw err;
        const dataArray = JSON.parse(data);
        res.json(dataArray);});
    });
   
   
  }
  catch(error){
    res.status(500).json({error : error})
  }

   
});
});


farmsRoutes.get('/scrapingDisease', async(req, res) => {
  try{
      const pythonProcess = spawn('python', ['C:/Users/MSI/Pictures/Diseases/getDiseaseData.py']);
      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });
      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      pythonProcess.on('close', (code) => {
        fs.readFile('C:/Users/MSI/Pictures/Diseases/dataDisease.json', (err, data) => {
          if (err) throw err;
          const dataArray = JSON.parse(data);
          res.json(dataArray);});
      });
     
     
    }
    catch(error){
      res.status(500).json({error : error})
    }
  });


export default farmsRoutes ;
