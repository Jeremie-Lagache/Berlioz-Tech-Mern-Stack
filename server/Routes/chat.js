const Chat = require('../models/chat.model');

exports.createChat = async (req, res) => {
    console.log(req.body);
    try {
        await Chat.create({
        project: req.body.projectName,
        participants: req.body.selectedParticipants,
      });
      res.json({ status: 'ok'});
    } catch (err) {
      res.json({ status: 'error', error: err });
    }
  };

  exports.DeleteChat = async (req, res) => {
  
    try {
      const chat = await Chat.deleteOne({ project : req.body.projectName });
  
      return res.json({ status: 'ok', chat : chat});
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  };