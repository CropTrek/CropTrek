import  express  from "express";

import {getFarms,addFarm, deleteFarm,updateFarm , getFarmsByUser,getFarmByOneUser,deleteFarmByUser,getUsersFarmers,existFarm,getFarmById,cropRegression,getFarmsByFarmerName} from '../Controllers/farmController.js';
import {addTree, getTrees,deleteTree,getInfoFile,getCropById,getTreeBySeason} from '../Controllers/TreeController.js';
import {addTreeN,updateTreeN,deleteTreeN,getTreeN} from '../Controllers/TreeNotfiController.js'
import {addDisease,getDisease,addDiseaseHisto,getDiseaseHisto,getDiseaseHistoByUser} from '../Controllers/DiseaseController.js'
import fs from 'fs';
import multer from 'multer';
import { spawn } from 'child_process';
import cron from 'node-cron';
import farmModel from "../Models/FarmModel.js";
import diseaseHistoModel from "../Models/DiseaseHistoModel.js";
import treeModel from "../Models/TreeModel.js";
import request from 'request';



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
    cb(null, 'C:/Users/MSI/Documents/GitHub/CropTrek/F-SocietyBackend/uploads/verifImage')
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
farmsRoutes.get('/cropReg', cropRegression); 
farmsRoutes.get('/getTreeBySeason/:selectedType', getTreeBySeason); 
farmsRoutes.get('/getCrop/:id', getCropById); 
farmsRoutes.get('/getTrees', getTrees); 
farmsRoutes.delete('/deleteTree/:id', deleteTree); 
farmsRoutes.get('/getFarmsByFarmerName/:username', getFarmsByFarmerName); 
farmsRoutes.get('/addTree', addTree); 
farmsRoutes.post('/addTreeN', addTreeN);
farmsRoutes.get('/getTreeN', getTreeN);
farmsRoutes.put('/updateTreeN/:id', updateTreeN);
farmsRoutes.delete('/deleteTreeN/:id', deleteTreeN);
farmsRoutes.get('/getDiseaseHisto', getDiseaseHisto);
farmsRoutes.post('/addDiseaseHisto', addDiseaseHisto);
farmsRoutes.get('/getDisease/:n', getDisease);
farmsRoutes.post('/addDisease', addDisease);
farmsRoutes.get('/getDiseaseHistoByUser/:id', getDiseaseHistoByUser);
// Configurer le middleware de multer pour gérer les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'C:/Users/MSI/Documents/GitHub/CropTrek/F-SocietyBackend/uploads/Diseases')
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




farmsRoutes.post('/diseaseDetect', async (req, res) => {
  const imagePath = req.body.imagePath;

  
  request({
    url: 'http://localhost:1000/predictDisease',
    method: 'POST',
    form: {
      imagePath: imagePath
    }
  }, function(error, response, body) {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'An error occurred' });
    }
    
    // Récupérer la prédiction renvoyée par Flask
 

    res.status(200).json({ success: true, message: body });
  });


  
});






farmsRoutes.get('/scrapingData', async(req, res) => {



      fs.readFile('../FlaskProject/dataFarm.json', (err, data) => {
        if (err) throw err;
        const dataArray = JSON.parse(data);
        res.json(dataArray);});
   

   
});
cron.schedule('0 0 1 */6 *', () => {
farmsRoutes.get('/miseAJourScrapingData', async(req, res) => {



  try{
    const pythonProcess = spawn('python', ['../FlaskProject/getFarmData.py']);
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on('close', (code) => {
      fs.readFile('../../FlaskProject/dataFarm.json', (err, data) => {
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
      const pythonProcess = spawn('python', ['../FlaskProject/getDiseaseData.py']);
      let result = '';
      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });
      pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
      pythonProcess.on('close', (code) => {
        fs.readFile('../FlaskProject/dataDisease.json', (err, data) => {
          if (err) throw err;
          const dataArray = JSON.parse(data);
          res.json(dataArray);});
      });
     
     
    }
    catch(error){
      res.status(500).json({error : error})
    }
  });
  farmsRoutes.get('/getSeason', (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Ajouter 1 car les mois sont numérotés de 0 à 11
    let season = '';
  
    if (currentMonth >= 3 && currentMonth <= 5) {
      season = 'Spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      season = 'Summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      season = 'Autumn';
    } else {
      season = 'Winter';
    }
  
    res.send({season});
  });
  farmsRoutes.get('/statistics/:country', async (req, res) => {
    try {
    const { country } = req.params;
   

    // Récupérer toutes les fermes du pays spécifié
    const farms = await farmModel.find({ country });

    // Récupérer toutes les maladies associées à ces fermes
    const diseases = await diseaseHistoModel.find({ farm: { $in: farms } }).populate('farm');
   
    // Récupérer tous les arbres associés à ces fermes
    const treeIds = farms.flatMap(farm => farm.crops.map(crop => crop.crop));
    const trees = [];
    for (const treeId of treeIds) {
      const tree = await treeModel.findById(treeId);
      if (tree) {
        trees.push(tree);
      }
    }
    console.log(trees)
    // Compter le nombre d'occurrences de chaque type d'arbre
    const treeCounts = {};
    trees.forEach(tree => {
     
        const type = tree.type;
        if (treeCounts[type]) {
          treeCounts[type] ++;
        } else {
          treeCounts[type] = 1;
        }
    
    });

    // Compter le nombre d'occurrences de chaque maladie
    const diseaseCounts = {};
    diseases.forEach(disease => {
      const name = disease.name;
      if (diseaseCounts[name]) {
        diseaseCounts[name]++;
      } else {
        diseaseCounts[name] = 1;
      }
    });

    // Calculer les pourcentages pour chaque type d'arbre et chaque maladie
    const totalTreeCount = Object.values(treeCounts).reduce((acc, val) => acc + val, 0);
    const treeStats = Object.entries(treeCounts).map(([id, count]) => ({
      type: id,
      count,
      percentage: count / totalTreeCount * 100
    }));

    const totalDiseaseCount = Object.values(diseaseCounts).reduce((acc, val) => acc + val, 0);
    const diseaseStats = Object.entries(diseaseCounts).map(([name, count]) => ({
      name,
      count,
      percentage: count / totalDiseaseCount * 100
    }));

    res.json({  treeStats, diseaseStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting statistics' });
  }
});
export default farmsRoutes ;
