import mongoose from "mongoose";
const userschema=mongoose.Schema({
name:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true,
    unique:true
},
password:{
    type:String,
    require:true

},
isAdmin:{
    type:Boolean,
    require:true,
    default:false
},
accStatus:{
    type:Boolean,
    require:true,
    default:true
}
, pendingDeletion: { // variable boolean bech tebe3 tafsikh l compte
    type: Boolean,
    default: false,
  }
},
{
    timestamps:true
}

)

const User=mongoose.model("User",userschema);
export default User;