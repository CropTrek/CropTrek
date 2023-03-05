import express from 'express';
import { updateUser,getUsers} from '../Controllers/UserController.js'
const userRouter = express.Router();
userRouter.get('/',getUsers);
userRouter.put('/:id', updateUser);
export default userRouter;