import mongoose from "mongoose";


const diseaseHistoSchema= mongoose.Schema ({
    name:{ type:String,
        require:true},
    description:{
        type:String,
        require:true
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    farm:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"Farm"
    },
    createdAt: { type: Date, default: Date.now }

},
    {
        timesTamps:true,
    }
);




const diseaseHistoModel = mongoose.model("DiseaseHisto", diseaseHistoSchema);
export default diseaseHistoModel;
