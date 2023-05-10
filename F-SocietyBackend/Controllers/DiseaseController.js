import diseaseModel from "../Models/DiseaseModel.js";
import diseaseHistoModel from "../Models/DiseaseHistoModel.js";

const addDiseaseHisto=async (req,res,next)=>{
    try {
        const {name,description,user,farm} = req.body;
       
        const disease  = new diseaseHistoModel({
            name:name,
         description:description,
         user:user,
         farm:farm
        });
        const addeddisease =await disease.save();
        
        res.status(200).json(addeddisease);
      } catch (error) {
         
        res.status(500).json({ message: error.message });
      } 
};
const getDiseaseHisto= async(req,res,next)=>{
    try {
        const diseaseList = await diseaseHistoModel.find();
        if (!diseaseList|| diseaseList.length === 0) {
          throw new Error("diseases not found");
        }
        res.status(200).json(diseaseList);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
};
const addDisease = async (req, res, next) => {
    try {
      const diseases = req.body;
  
      for (let i = 0; i < diseases.length; i++) {
        const { name, description } = diseases[i];
  
        const disease = new diseaseModel({
          name: name,
          description: description
        });
  
        await disease.save();
      }
  
      res.status(200).json({ message: "Diseases added successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const getDisease= async(req,res,next)=>{
    try {

        const { n } = req.params;
        
        const diseaseList = await diseaseModel.findOne({name: n});
        if (!diseaseList|| diseaseList.length === 0) {
          throw new Error("diseases not found");
        }
        res.status(200).json(diseaseList);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
};
const getDiseaseHistoByUser= async(req,res,next)=>{
  try {
    const { id } = req.params;
      const diseaseList = await diseaseHistoModel.find({user: id});
      if (!diseaseList|| diseaseList.length === 0) {
        throw new Error("diseases not found");
      }
      res.status(200).json(diseaseList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 
};
export {
  getDiseaseHistoByUser, 
    getDisease,
addDiseaseHisto,
getDiseaseHisto,
    addDisease
}