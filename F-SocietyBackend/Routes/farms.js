import  express  from "express";

import {getFarms,addFarm, deleteFarm,updateFarm , getFarmsByUser} from '../Controllers/farmController.js';

const farmsRoutes = express.Router();


farmsRoutes.get('/', getFarms); 
farmsRoutes.get('/getFarmsByUser/:idUser', getFarmsByUser); 
farmsRoutes.post('/', addFarm); 
farmsRoutes.delete('/:id', deleteFarm); 
farmsRoutes.put('/:id', updateFarm); 
export default farmsRoutes ;
