 import express from 'express';
 import {spawn} from "child_process";
import fetch from "node-fetch";
// import pythonModule from 'file:///C:/Users/Mouna/Desktop/Desktop/sem2/projetIntegre3/CropTrek/F-SocietyBackend/pythonFiles/index.js';
const pyRouteTest=express.Router();
// import { spawn } from 'child_process';
// pyRouteTest.get('/bonjour', async function (req, res) {
//     try {
//         const results = await pythonModule.runScript('pythonFiles/test.py', []);
//         const output = results.toString();
//         console.log('Résultats : ', output);
//         res.send(output);
//
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Erreur lors de l\'exécution du script Python');
//     }
// });
//
// export default pyRouteTest;



 // Définir le chemin d'accès au script Python




 pyRouteTest.get('/recommendations/:productId', (req, res) => {
     // Récupérer l'ID du produit à partir des paramètres de la requête
     const productId = req.params.productId;

     // Appeler le script Python avec l'ID de produit en tant qu'argument
     const pythonProcess = spawn('python', ['../F-SocietyBackend/pythonFiles/test.py', productId]);

     // Récupérer les données renvoyées par le script Python
     let data = '';
     pythonProcess.stdout.on('data', (chunk) => {
         data += chunk.toString();
     });

     // Gérer les erreurs
     pythonProcess.stderr.on('data', (err) => {
         console.error(err.toString());
         res.status(500).send('Erreur lors de l\'exécution du script Python');
     });

     // Terminer le processus
     pythonProcess.on('close', (code) => {
         if (code !== 0) {
             res.status(500).send('Le script Python a renvoyé une erreur');
         } else {
             const recommendedProducts = JSON.parse(data);
             res.send(recommendedProducts);
         }
     });
 });
 pyRouteTest.get('/products/:productId', async (req, res) => {
     const { productId } = req.params;

     try {
         const response = await fetch(`http://localhost:1000/products/${productId}`);
         const data = await response.json();

         res.json(data);
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Une erreur est survenue' });
     }
 });

export default pyRouteTest;

