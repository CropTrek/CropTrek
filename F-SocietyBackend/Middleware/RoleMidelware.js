const ROLES = {
    "USER": "USER",
    "ADMIN": "ADMIN"
}

        /********TAKE ROLES AND RETURN REQ, RES AND NEXT ********/
const inRole  = (...roles)=>(req, res, next)=>{
        /********REQ.USER BECAUSE WE GONNA SECURE THE PATH WITH PASSPORT ********/    
    const role =  roles.find(role=> req.user.role === role)
    if(!role){
      return res.status(401).json({message: "no access"})
    }
     next()
}

module.exports = {
    inRole,
    ROLES
}