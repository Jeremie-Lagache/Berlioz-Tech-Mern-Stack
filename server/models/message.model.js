const mongoose = require('mongoose')

const Message = new mongoose.Schema(
	{
		project: { type: String, required: true },
		sender: { type: String, required: true,},
		message: { type: String },
	},
    {
        timestamps: true,
    },
	{ collection: 'messages' }
)

const model = mongoose.model('message', Message)

module.exports = model