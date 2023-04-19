import Message from '../Models/Message.js';


  const getMessages = async (req, res) => {
    try {
      const messages = await Message.find({
        $or: [
          { to: req.params.userId },
          { from: req.params.userId },
        ],
      }) .populate("from", "_id")
      .populate("to", "_id")
      .sort({ createdAt: 1 });
      const formattedMessages = messages.map(message => ({
        from: message.from._id,
        to: message.to._id,
        text: message.text
      }));
      res.json(formattedMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export {getMessages}