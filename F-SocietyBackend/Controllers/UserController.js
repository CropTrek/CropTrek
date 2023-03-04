import User from '../Models/UserModel.js'

const addContact = async (req, res) => {
    try {
        console.log("heelo");
      const { name,email, password } = req.body;
      console.log(req.body);
      const addedContact = await User.create({ name, email, password });
      res.json(addedContact);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };



  export default  {addContact};