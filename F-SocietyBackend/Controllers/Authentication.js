import User from '../Models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


/*#################################################################LOGIN USER#################################################################*/

    const LogIn = async (req, res) => {

         /******SECRETCODE IS USED TO SIGN THE JWT AND MAKE IT VALID*******/       
        const secretCode="yx9TUnTIA^luh&M6z82epT8*NaPg^xBWD!KpDtR&jp2CNeexK&"

        try{

        const email = req.body.email
        const password = req.body.password
        console.log(email, password);
        /******VERIFY IF USER EXISTS*******/
        const findUser = await User.findOne({ where : {email: email}})
        
        if(!findUser){
            res.status(401).json({message : 'USER NOT FOUND !'})
        }
        /******VERIFY IF USER'S ACCOUNT IS ACTIVATED*******/
        /*if(findUser.accStatus == false){
            res.status(401).json({message : 'THIS ACCOUNT IS NOT ACTIVATED YET !'})
        }*/
        /******VERIFY THE PASSWORD*******/        
        const hashedPassword = findUser.password
        const pass = await bcrypt.compare(password, hashedPassword)

        if(!pass){

            res.status(401).json({message : 'WRONG EMAIL OR PASSWORD !'})
        }

        /******GENERATE A JWT FROM THE USERS DATA*******/     
        const token = await jwt.sign({
            email : findUser.email,
            password : findUser.password
        }, secretCode, {expiresIn: '5h'})
        
        /******IF THE JWT GENERATED WITH SUCCESS*******/  
        if(token){
            findUser.password = ''
            res.status(200).json({
                message : 'USER CONNECTED !' , user : findUser 
            })
        }

    }
        catch(err){
            res.status(500).json({err : 'SERVER ERROR !'})
        }  
    }

/** email --> eya.benamor@esprit.tn **** password --> eyayouta */
    
export default LogIn
