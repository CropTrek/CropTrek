import express from 'express';
import {updateProfilePhoto,userRegistration, updateUser,getUsers,deleteUserPart1,deleteUserPart2,deleteUserDash,blockUser,getBlockedUsers} from '../Controllers/UserController.js'
//import User from '../../Models/UserModel.js';
const userRouter = express.Router();
userRouter.get('/',getUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user with the given ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string   
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRouter.put('/:id', updateUser);
//userRouter.get('/:id', updateUser);
userRouter.post('/delete-account',deleteUserPart1);
userRouter.get('/approve-account-deletion',deleteUserPart2) // http://localhost:5000/api/users2/approve-account-deletion?email=vv&action=approve
userRouter.delete('/deleteUserDash/:id',deleteUserDash);
userRouter.put('/blockUserDash/:id',blockUser);
userRouter.get('/getblockedUser',getBlockedUsers);
userRouter.post('/register', userRegistration);
userRouter.post('/updatePhoto', updateProfilePhoto);
export default userRouter;