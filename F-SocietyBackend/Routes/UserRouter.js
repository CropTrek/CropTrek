import express from 'express';
import path from 'path';
import {getImageByUserID,getUserbyID,updateProfilePhoto,userRegistration, updateUser,getUsers,deleteUserPart1,deleteUserPart2,deleteUserDash,blockUser,getBlockedUsers} from '../Controllers/UserController.js'
import User from '../Models/UserModel.js'
import multer from 'multer'
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
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: Date     
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
userRouter.get('/:id', getUserbyID);
userRouter.post('/delete-account',deleteUserPart1);
userRouter.get('/approve-account-deletion',deleteUserPart2) // http://localhost:5000/api/users2/approve-account-deletion?email=vv&action=approve
userRouter.delete('/deleteUserDash/:id',deleteUserDash);
userRouter.put('/blockUserDash/:id',blockUser);
userRouter.get('/getblockedUser',getBlockedUsers);
userRouter.post('/register', userRegistration);
userRouter.post('/updatePhoto', updateProfilePhoto);
userRouter.get('/file/:id', getImageByUserID);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      const userId = req.params.id;
      const timestamp = Date.now();
      const ext = file.originalname.split('.').pop();
     const filename = `${userId}.png`;
      cb(null, filename);
    }
  });
  
  const upload = multer({ storage: storage });
  

  
  // Endpoint pour mettre à jour la photo de l'utilisateur
  userRouter.put('/:id/photo', upload.single('photo'), async (req, res) => {
    try {
      // Recherche de l'utilisateur correspondant à l'ID fourni
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }
  
      // Mise à jour de la photo de l'utilisateur avec le chemin vers le fichier image
      user.profilePhoto = req.file.path;
  
      // Sauvegarde de l'utilisateur mis à jour dans la base de données
      await user.save();
  
      // Réponse avec les données de l'utilisateur mis à jour
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour de la photo de l\'utilisateur' });
    }
  });
export default userRouter;