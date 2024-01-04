const mongoose = require('mongoose')

var whatsappUserSchema = new mongoose.Schema({
	waNumber: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		default: ''
	},
	chats: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat"
		}
	]
})

module.exports = mongoose.model("WhatsappUser", whatsappUserSchema)