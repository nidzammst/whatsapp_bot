const fs = require('fs');
const WhatsappUser = require('../models/whatsappUserModel');
const Chat = require('../models/chatModel');

const handleChatData = async (err, data) => {
  try {
    if (err) throw new Error(err);

    // Parse JSON data
    const jsonData = JSON.parse(data);

    const randomNumber = Math.floor(Math.random() * jsonData.length);
    const chat = new Chat({
      question: jsonData[randomNumber].soal,
      answer: jsonData[randomNumber].jawaban,
      category: "Asah Otak"
    });

      await chat.save();

    const waUser = new WhatsappUser({
      waNumber: message.from,
      name: message._data.notifyName,
    });
    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
		waUser.chat.addToSet(chat._id);

    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber });

    if (!existingUser) {
      // Save new user only if the user doesn't exist
      await waUser.save();
    } else {
      console.log("User already exists");
    }
    console.log('ok')
  } catch (error) {
    console.error('Error:', error.message);
  }
};

module.exports = { handleChatData }