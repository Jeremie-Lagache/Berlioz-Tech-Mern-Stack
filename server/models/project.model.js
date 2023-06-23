const mongoose = require('mongoose')

const Project = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		category: {type: String, required: true },
		creator: { type: String, required: true },
		participants: {
            type: [String],
            required: true,
          },
	},
	{ collection: 'projects' }
)

const model = mongoose.model('ProjectData', Project);

module.exports = model;