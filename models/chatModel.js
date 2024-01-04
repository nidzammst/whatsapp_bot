const mongoose = require('mongoose')

var chatSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	category: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = mongoose.model("Chat", chatSchema)