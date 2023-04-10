import mongoose from "mongoose";


const treeSchema= mongoose.Schema ({
    type:{
        type:String,
        require:false
        
    },
    water:{
        type:String,
        require:false
        
    },
    fertilization:{
        type:String,
        require:false
    },
   
    soil:{
        type:String,
        require:true
    },

    hardinessZones:{
        type:String,
        require:false
       
        
    },
    plantingTime:{
        type:String,
        require:false
    },
    sunlight:{
        type:String,
        require:false
    }
},
    {
        timesTamps:true,
    }
);




const treeModel = mongoose.model("Tree", treeSchema);
export default treeModel;
