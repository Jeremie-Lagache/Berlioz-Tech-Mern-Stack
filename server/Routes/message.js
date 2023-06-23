const Message = require('../models/message.model');

exports.createMessage = async (req, res) => {
    console.log(req.body);
    try {
        await Message.create({
        project: req.body.projectName,
        sender: req.body.sender,
        message: req.body.message,
      });
      res.json({ status: 'ok'});
    } catch (err) {
        console.log(err);
      res.json({ status: 'error', error: err });
    }
  };

  exports.getMessages = async (req, res) => {
    const project = req.headers['project'];
  
    try {
      const message = await Message.where({ project: project});
  
      return res.json({ status: 'ok', message: message });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  };

  exports.DeleteMessage = async (req, res) => {

    const message = req.body.message.message
    const sender = req.body.message.sender
    const createdAt = req.body.message.createdAt
  
    try {
      await Message.deleteOne({ 
        message : message,
        sender : sender,
        createdAt : createdAt,
      });
  
      return res.json({ status: 'ok'});
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  };