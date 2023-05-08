import treeNotifModel from "../Models/TreeNotifModel.js";

const addTreeN=async (req,res,next)=>{
    try {
        const {description} = req.body;
       
        const treeN  = new treeNotifModel({
         description:description
        });
        const addedTreeN =await treeN.save();
        
        res.status(200).json(addedTreeN);
      } catch (error) {
         
        res.status(500).json({ message: error.message });
      } 
};
const getTreeN= async(req,res,next)=>{
    try {
        const notifTreeList = await treeNotifModel.find();
        if (!notifTreeList|| notifTreeList.length === 0) {
          throw new Error("tree notifs not found");
        }
        res.status(200).json(notifTreeList);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   
};
const updateTreeN=async (req,res,next)=>{
  try {
    const { id } = req.params;
    const {isRead } = req.body;
    const checkIfTreeNExist = await treeNotifModel.findById(id);
    if (!checkIfTreeNExist) {
      throw new Error("tree notif not found!");
    }
    const updatedTreeN = await treeNotifModel.findByIdAndUpdate(
      id,
      {
        $set: {isRead },
      },
      { new: true }
    );
    res.status(200).json(updatedTreeN);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
const deleteTreeN=async (req,res,next)=>{
  try {
    const {id} = req.params;
    const checkIfTreeNExist = await treeNotifModel.findById(id);
    if (!checkIfTreeNExist) {
      throw new Error("notif tree not found!");
    }
    await treeNotifModel.findByIdAndDelete(id);
    res.json("tree notif deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
   
    getTreeN,
    updateTreeN,
    deleteTreeN,
    addTreeN
}