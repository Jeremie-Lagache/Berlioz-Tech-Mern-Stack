const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
    console.log(req.body);
    try {
      await Project.create({
        name: req.body.projectName,
        category: req.body.projectCategory,
        creator: req.body.projectCreator,
        participants: req.body.selectedParticipants,
      });
      res.json({ status: 'ok' });
    } catch (err) {
      res.json({ status: 'error', error: err });
    }
  };

  exports.getProjectData = async (req, res) => {
    const creator = req.headers['creator'];
  
    try {
      const project = await Project.where({ $or: [
        { creator: creator },
        { participants: { $elemMatch: { $eq: creator } } }
      ] });
  
      return res.json({ status: 'ok', project: project });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  };

  exports.DeleteProject = async (req, res) => {
  
    try {
      const project = await Project.deleteOne({ name : req.body.projectName });
  
      return res.json({ status: 'ok', project: project });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error', error: error });
    }
  };





  