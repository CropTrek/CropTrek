import Message from '../Models/Message.js';
import mongoose from "mongoose";

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { to: req.params.userId },
        { from: req.params.userId },
      ],
    })
    .populate("to", "_id")
    .populate({
      path: "from",
      select: "_id",
      model: "User"
    })
    .sort({ createdAt: 1 });

    const formattedMessages = messages.map(message => {
      let from = message.from?._id || "unknown";
      let to=message.to?.id;
      let createdAt = message?.createdAt;

 
  
      return {
        from: from,
        to: to,
        text: message.text,
        read: message.read,
        createdAt:createdAt,
      }
    });

    res.json(formattedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLastMessages = async (req, res) => {

  try {
    const { id } = req.params;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ from: mongoose.Types.ObjectId(id) }, { to: mongoose.Types.ObjectId(id) }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$from", mongoose.Types.ObjectId(id)] },
              { $toObjectId: "$to" },
              { $toObjectId: "$from" },
            ],
          },
          from: { $first: "$from" },
          to: { $first: "$to" },
          text: { $first: "$text" },
          createdAt: { $first: "$createdAt" },
          read: { $first: "$read" },

        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "user.name": 1,
          "user.surname": 1,
          "user.profilePhoto": 1,
          from: 1,
          to: 1,
          text: 1,
          createdAt: 1,
          read: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
     
    ]);

    res.status(200).json(conversations);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const getLastMessagess = async (req, res) => {

  try {
    const { id } = req.params;

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ from: mongoose.Types.ObjectId(id) }, { to: mongoose.Types.ObjectId(id) }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$from", mongoose.Types.ObjectId(id)] },
              { $toObjectId: "$to" },
              { $toObjectId: "$from" },
            ],
          },
          from: { $first: "$from" },
          to: { $first: "$to" },
          text: { $first: "$text" },
          read: { $first: "$read" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          "user.name": 1,
          "user.surname": 1,
          "user.profilePhoto": 1,
          from: 1,
          to: 1,
          text: 1,
          read: 1,
          createdAt: 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 4,
      },
   
    ]);

    res.status(200).json(conversations);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const countUnreadMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const unreadCount = await Message.countDocuments({
      to: mongoose.Types.ObjectId(id),
      read: false,
    });

    res.status(200).json({ unreadCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const markReceivedMessagesAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Message.updateMany({ to: id }, { read: true });
    res.status(200).json({ success: true, message: `${result.nModified} messages marked as read.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export {getMessages,getLastMessages,getLastMessagess,countUnreadMessages,markReceivedMessagesAsRead}