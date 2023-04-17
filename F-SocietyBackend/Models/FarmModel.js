import mongoose from "mongoose";
import treeModel from "../Models/TreeModel.js";





const farmSchema= mongoose.Schema ({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    name:{
        type:String,
        require:true
    },
    farmingType:{
        type:String,
        require:true
    }, 

    crops: [{
        crop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'treeModel',
        },
        count: Number,
      }] ,require:false ,
    country:{
        type:String,
        require:true
    },
    employees:{
        type:Number,
        require:true  
    },
    certification:{
        type:String,
        require:false
    },
    // location: {
    //     type: "Point",
    //     coordinates: [ -73.856077, 40.848447 ],
    //     require:true  
    //   },
    status:{
        type:Boolean,
        require:false
    },
   

    area:{
        type:Number,
        require:true,
        default:0
        
    },
    soilType:{
        type:String,
        require:true
    },
    terrain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Terrain",
        required: true,
      }
},
    {
        timesTamps:true,
    }
);




const farmModel = mongoose.model("Farm", farmSchema);
export default farmModel;
