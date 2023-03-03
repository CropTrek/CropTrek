import mongoose from "mongoose";




const treeSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        default:0
        
    },
    image:{
        type:String,
        require:true,
        default:0
        
    },
    type:  {
        type: String,
        enum : ['fruit','vegetable'],
        default: 'vegetable', require:true
    },
    season:{
        type:String,
        enum : ['winter','spring','summer','autumn'],
        default: 'winter', require:true
        
    }
})

const farmSchema= mongoose.Schema ({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    country:{
        type:String,
        require:true
    },
   
    description:{
        type:String,
        require:true
    },
trees:[treeSchema],

    area:{
        type:Number,
        require:true,
        default:0
        
    }
},
    {
        timesTamps:true,
    }
);




const farmModel = mongoose.model("Farm", farmSchema);
export default farmModel;