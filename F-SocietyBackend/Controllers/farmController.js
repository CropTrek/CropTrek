import farmModel from "../Models/FarmModel.js";


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
const getFarmsByUser= async(req,res,next)=>{
  try {
    const { idUser } = req.params;
      const farmList = await farmModel.find({user: idUser});
      if (!farmList|| farmList.length === 0) {
        throw new Error("farms not found");
      }
      res.status(200).json(farmList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
 
};
const addFarm=async (req,res,next)=>{
    try {
        const { user, country, description , trees , area   } = req.body;
       
        const farm  = new farmModel({
         user, country,description,trees,area
        });
        const addedFarm =await farm.save();
        
        res.status(200).json(addedFarm);
      } catch (error) {
         
        res.status(500).json({ message: error.message });
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
    res.json("farm  deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateFarm=async (req,res,next)=>{
  try {
    const { id } = req.params;
    const { user, country, description , trees , area   } = req.body;
    const checkIfFarmExist = await farmModel.findById(id);
    if (!checkIfFarmExist) {
      throw new Error("farm not found!");
    }
    const updatedFarm = await farmModel.findByIdAndUpdate(
      id,
      {
        $set: { user, country,description,trees,area },
      },
      { new: true }
    );
    res.status(200).json(updatedFarm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
export {
    
    getFarms,
    addFarm,
    deleteFarm,
    updateFarm,
    getFarmsByUser
  
}