import treeModel from "../Models/TreeModel.js";
import fs from 'fs';
import { spawn } from 'child_process';






const getInfoFile=async(req,res)=>{
  


 
fs.readFile(req.file.path, 'utf8', (err, data) => {
  const trees = JSON.parse(data);
  if (err) {
    console.error(err)
    return
  }
  res.status(200).json(trees);
})
}





// const addTree = async (req, res, next) => {

//   const file = req.file;
//     if (!file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     try {

//     console.log(req.file.path)
//     const data = fs.readFileSync(req.file.path, 'utf-8');
 
   
//     const trees = JSON.parse(data);
//     console.log(trees)
//     const addedTrees = [];
//     for (const key in trees) {
//      // const tree = trees[key];
//       const newTree = new treeModel({
//         type: key,
//         water: trees[key].water,
//         fertilization:trees[key].fertilization,
//         soil:trees[key].soil,
//         hardinessZones: trees[key].hardinessZones,
//         sunlight: trees[key].sunlight,
//         plantingTime: trees[key].plantingTime
//       });
        
//       addedTrees.push(newTree);  
//     }
   
//     try {
      
//       const addedTree = await treeModel.insertMany(addedTrees);
//       console.log("Trees added successfully!");
//       res.send("Trees added successfully!");
    

      
//     } catch (err) {
//       console.log("pas d'ajout");
//       res.send(err);
//     }

//   } catch (err) {
//     console.log(err);
//     return;
//   }
// };



//add tree from json file
// const addTree = async (req, res, next) => {

//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   try {
//     console.log(req.file.path)
//     const data = fs.readFileSync(req.file.path, 'utf-8');
//     const trees = JSON.parse(data);
//     console.log(trees)
//     const addedTrees = [];

//     for (const key in trees) {
//       const treeData = trees[key];
//       const filter = { type: key };
//       const update = { ...treeData, type: key };
//       const options = { upsert: true, new: true, setDefaultsOnInsert: true };

//       const updatedTree = await treeModel.findOneAndUpdate(filter, update, options);
//       addedTrees.push(updatedTree);
//     }

//     console.log("Trees added/updated successfully!");
//     res.send("Trees added/updated successfully!");

//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Server error');
//   }
// };
const addTree = async (req, res, next) => {
  try {
    const pythonProcess = spawn('python', ['C:/Users/MSI/Pictures/Diseases/getTreeData.py']);
    let result = '';
    pythonProcess.stdout.on('data', async (data) => {
      result += data.toString();
    });
    pythonProcess.stderr.on('data', async (data) => {
      console.error(`stderr: ${data}`);
    });
    await new Promise((resolve) => {
      pythonProcess.on('close', (code) => {
        resolve(code);
      });
    });

    const data = fs.readFileSync('C:/Users/MSI/Pictures/Diseases/TreeData.json', 'utf-8');
    const trees = JSON.parse(data);
    
    const addedTrees = [];

    for (const key in trees) {
      const treeData = trees[key];
      const filter = { type: key };
      const update = { ...treeData, type: key };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const updatedTree = await treeModel.findOneAndUpdate(filter, update, options);
      addedTrees.push(updatedTree);
    }

    console.log("Trees added/updated successfully!");
    res.send("Trees added/updated successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};








  const getTrees= async(req,res,next)=>{
   
    try {
        const treeList = await treeModel.find();
        if (!treeList|| treeList.length === 0) {
          throw new Error("trees not found");
        }
        res.status(200).json(treeList);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
}; 
const deleteTree=async (req,res,next)=>{
    try {
      const {id} = req.params;
      const checkIfTreeExist = await treeModel.findById(id);
      if (!checkIfTreeExist) {
        throw new Error("tree not found!");
      }
      await treeModel.findByIdAndDelete(id);
      res.json("tree  deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getCropById= async(req,res,next)=>{
    try {
      const { id } = req.params;
      const crop=await treeModel.findById(id);
        if (!crop) {
          throw new Error("crop not found");
        }
        res.status(200).json(crop);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
  };
  const getTreeBySeason=async(req,res,next)=>{
    const { selectedType } = req.params;
  
  const typesArray = selectedType.split(',');
  const typesRegex = typesArray.map(type => new RegExp(type, 'i'));
  
  treeModel.find({ plantingTime: { $all: typesRegex } })
    .then(trees => res.json(trees))
    .catch(err => res.status(400).json({ error: err.message }));
  }
export {
    
    addTree,
    getTrees,
    deleteTree,
    getInfoFile,
    getCropById,
    getTreeBySeason
  
}