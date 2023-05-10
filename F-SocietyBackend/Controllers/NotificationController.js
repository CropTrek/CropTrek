import Pusher from 'pusher';
import Notification from '../Models/Notification.js';
import User from '../Models/UserModel.js'
import mongoose from "mongoose";


const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});



const sendNotification = async (title, body, sender, recipientId, role) => {
  let recipients = [];

  if (role) {
    const users = await User.find({ role: role }).select('_id');
    recipients = users.map(user => ({ userId: user._id, read: false }));
  }

  if (recipientId) {
    recipients = [{ userId: recipientId, read: false }];
  }

  const notification = new Notification({
    title,
    body,
    sender,
    recipients
  });

  try {
    const savedNotification = await notification.save();

    const formattedNotification = {
      id: savedNotification._id,
      title: savedNotification.title,
      body: savedNotification.body,
      sender: savedNotification.sender,
      recipients: savedNotification.recipients,
      createdAt: Date.now(),
      
    };
    
    // send notification to recipients
    if (recipients.length > 0) {
      pusher.trigger("croptek-development", "new-notification", formattedNotification);
    }
    
    return formattedNotification;
  } catch (error) {
    console.error(error);
    throw new Error('Error sending notification');
    }
    }; 

async function markNotificationsAsRead(req, res) {
  const recipientId = req.params.id;

  try {
    const notifications = await Notification.find({ "recipients.userId": recipientId });

    // Set the "read" property to true for the matching recipient in each notification
    notifications.forEach(async (notification) => {
      const recipientIndex = notification.recipients.findIndex((recipient) => recipient.userId.toString() === recipientId.toString());
      if (recipientIndex !== -1) {
        notification.recipients[recipientIndex].read = true;
        await notification.save();
      }
    });

    res.status(200).json({ message: `Marked ${notifications.length} notifications as read for recipient ${recipientId}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
}
const getNotificationsForUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find all notifications that were sent to this user
    const notifications = await Notification.find({ recipients: { $elemMatch: { userId: userId } } })
        .populate('sender', 'name')
        .sort({ createdAt: -1 })
        .lean();

    // Count the number of unread notifications for this user
    const unreadCount = notifications.reduce((count, notification) => {
      let unreadRecipients = 0;
      notification.recipients.forEach((recipient) => {
        console.log(recipient.userId.toString())
        const recid =recipient.userId.toString()
        console.log( userId)
    

     console.log(recid== userId)
        if (recipient.read===false ) {
          if(recid== userId){
          unreadRecipients++;
        }}
      });
      return count + unreadRecipients;
    }, 0);
    
    return res.status(200).json({
      notifications: notifications,
      unreadCount: unreadCount
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error getting notifications' });
  }
};

export {getNotificationsForUser,sendNotification,markNotificationsAsRead}
