 import express from 'express';
 import natural from 'natural';
 import BadWords from 'bad-words';
 import nodemailer from 'nodemailer';
 import User from "../Models/UserModel.js";
 const unblockRouter = express.Router();
 const badWords = new BadWords();



 unblockRouter.get('/checkEmail/:email', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email, accStatus: false });
   if (user) {
    res.status(200).send({ exists: true });
  } else {
    res.status(404).send({ exists: false });
  }
});


unblockRouter.get('/getUserByEmail/:email', async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
   if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ exists: false });
  }
});




unblockRouter.post('/generateCode',  async(req,res)=>{
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
     return res.status(404).json({ message:  "User Not Exists!!" });
    }   
    const codeExpiration = Date.now() + (5 * 60 * 1000); // expiration dans 5 minutes
 const codeVerification= Math.floor(100000 + Math.random() * 900000);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "haweswebsite@gmail.com",
        pass: "lmsevtndtdqutlbw",
      },
    });

    var mailOptions = {
      from: "haweswebsite@gmail.com",
      to: email,
      subject:  'CropTrek - Verification code',
      html: `
        <h3>Hello </h3>
        <p> Your code verification is ${codeVerification}</p>
        <p>Cheers,</p>
        <p>CropTrek</p>
      `
    };
    const updatedUser = await User.findByIdAndUpdate(
      oldUser._id,
      {
        $set: {codeVerification,codeExpiration},
      },
      { new: true }
    );
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {

        console.log("Email sent: " + info.response);
        res.status(200).json({ message: 'Code verification sent ' });
      }
    });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





unblockRouter.post('/verifyCode/:id([0-9a-fA-F]{24})',async (req, res) => {
  const now = Date.now();
  const { code } = req.body;
  const { id } = req.params;
   const oldUser = await User.findById(id);


  if (oldUser.codeExpiration && now > oldUser.codeExpiration) {
    // le code a expiré, réinitialiser le code et la date d'expiration
    const updatedUser = await User.findByIdAndUpdate(
      oldUser._id,
      {
        $set: {
          codeVerification: null,
          codeExpiration: null
        },
      },
      { new: true }
    );
    return res.status(400).send("Le code d'activation a expiré.");
  }
  
  // vérifier le code d'activation
  if (oldUser.codeVerification === code) {
    // code correct, effectuer l'opération souhaitée
    // réinitialiser le code et la date d'expiration
    const updatedUser = await User.findByIdAndUpdate(
      oldUser._id,
      {
        $set: {
          codeVerification: null,
          codeExpiration: null
        },
      },
      { new: true }
    );
    return res.status(200).send("Le code d'activation est correct.");
  } else {
    return res.status(400).send("Le code d'activation est incorrect.");
  }

});




 unblockRouter.post("/unblockRequest/:id([0-9a-fA-F]{24})", async(req, res) => {
   const { text } = req.body;
   const { id } = req.params;
   const oldUser = await User.findById(id);





   var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "haweswebsite@gmail.com",
      pass: "lmsevtndtdqutlbw",
    },
  });

 




   if(oldUser.accStatus==false){

  
   const classifier = new natural.BayesClassifier();
   classifier.addDocument("I'm sorry for my behavior.", "apologetic");
   classifier.addDocument("I promise to do better in the future.", "promising");
   classifier.addDocument("I don't care about being blocked.", "dismissive");
   classifier.addDocument("You can't do this to me!", "defiant");
   classifier.train();

   const unblockReasonClassification = classifier.classify(text);

   if (unblockReasonClassification === "apologetic" && unblockReasonClassification === "promising") {
     const cleanReason = badWords.clean(text);
     if (text !== cleanReason) {
    



 var mailOptions = {
    from: "haweswebsite@gmail.com",
    to: oldUser.email,
    subject:  'CropTrek - Request cancel block',
    html: `
      <h3>Hello </h3>
      <p> Your request for cancel block is rejected because your unblock reason contains bad words </p>
      <p>Cheers,</p>
      <p>CropTrek</p>
    `
  };
 
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {

    
      res.status(200).json({ message: 'mail sent ' });
    }
  });


  return res.status(200).send("Unblock reason contains bad words");


     }
     const updatedUser = await User.findByIdAndUpdate(
      oldUser._id,
      {
        $set: {
         accStatus: true,
         
        },
      },
      { new: true }
    );



    var mailOptions = {
      from: "haweswebsite@gmail.com",
      to: oldUser.email,
      subject:  'CropTrek - Request cancel block ',
      html: `
        <h3>Hello </h3>
        <p> Your request for cancel block is accepted  </p>
        <p>Cheers,</p>
        <p>CropTrek</p>
      `
    };
   
    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
  
      
        res.status(200).json({ message: 'mail sent ' });
      }
    });





    return res.status(200).send("your request is accepted");







   } else {


    var mailOptions = {
      from: "haweswebsite@gmail.com",
      to: oldUser.email,
      subject:  'CropTrek - Request cancel block ',
      html: `
        <h3>Hello </h3>
        <p> Your request for cancel block is rejected because your unblock reason not convincing  </p>
        <p>Cheers,</p>
        <p>CropTrek</p>
      `
    };

    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
  
      
        res.status(200).json({ message: 'mail sent ' });
      }
    });






    return res.status(200).send("Unblock reason not convincing");
   
  }
}else{
  return res.status(404).send("User is not blocked");
}
});

export default unblockRouter;
