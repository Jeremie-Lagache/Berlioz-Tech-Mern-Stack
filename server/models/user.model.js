const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		surname: { type: String, required: true },
		name: { type: String, required: true, unique: true },
		username: { type: String },
		password: { type: String, required: true },
	},
	{ collection: 'users' }
)

const model = mongoose.model('UserData', User)

module.exports = model