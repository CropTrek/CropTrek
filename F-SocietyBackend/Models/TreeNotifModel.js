import mongoose from "mongoose";


const treeNotifSchema= mongoose.Schema ({
    description:{
        type:String,
        require:true
        
    },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
   

},
    {
        timesTamps:true,
    }
);




const treeNotifModel = mongoose.model("TreeNotif", treeNotifSchema);
export default treeNotifModel;
