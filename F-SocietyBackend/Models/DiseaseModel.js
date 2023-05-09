import mongoose from "mongoose";


const diseaseSchema= mongoose.Schema ({
    name:{ type:String,
        require:true},
    description:{
        type:String,
        require:true
        
    },
    
   

},
    {
        timesTamps:true,
    }
);




const diseaseModel = mongoose.model("Disease", diseaseSchema);
export default diseaseModel;
