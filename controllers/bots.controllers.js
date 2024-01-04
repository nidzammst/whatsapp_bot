const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const WhatsappUser = require('../models/whatsappUserModel')
const Chat = require('../models/chatModel')

const botResponse = asyncHandler(async (req,res)=>{
	const client = new Client({
		authStrategy: new LocalAuth()
	});

	client.on('qr', qr => {
		qrcode.generate(qr, {small: true});
	});
	client.on('ready', () => {
		console.log('Client is ready!');
	});

	client.on('message', async (message) => {
		if(message.body.toLowerCase().replace(/\s/g, '') === 'myprivateproject') {
			client.sendMessage(message.from, `Hai Nidzam's Bot disini silahkan pilih Bot\n*bot-1:* Asah Otak\n*bot-2:* Cak Lontong\n*bot-3:* Family 100\n*bot-4:* Siapakah Aku\n*bot-5:* Susun Kata\n*bot-6:* Tebak Bendera\n*bot-7:* Tebak Gambar\n*bot-8:* Tebak Kabupaten\n*bot-9:* Tebak Kalimat\n*bot-10:* Tebak Kata\n*bot-11:* Tebak Kimia\n*bot-12:* Tebak Lagu\n*bot-13:* Tebak Lirik\n*bot-14:* Tebak Tebakan\n*bot-15:* Tebak Teka-Teki\n*bot-16:* Kata-kata Bucin\n*bot-17:* Kata-kata Motivasi\n*bot-18:* Kata-kata Renungan\n*bot-19:* Kata-kata Truth\n*bot-20:* Kata-kata Dare\n*bot-21:* Quotes\n\n\n*Silahkan tekan 'chat' untuk mengirim pesan...*`);
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'hapus-bot') {
			async function deleteUserAndChats() {
				try {
					const deletedUser = await WhatsappUser.findOneAndDelete({ waNumber: message.from })
					await Chat.deleteMany({ _id: { $in: deletedUser.chats } });
					client.sendMessage(message.from, "Beralih ke whatsapp tekan *myprivateproject* untuk meminta bot")
				}
				catch(error) {
					console.error('Terjadi kesalahan:', error.message);
				}
			}
			deleteUserAndChats();
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-1') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-1"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/asahotak.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-2' || message.body.toLowerCase().replace(/\s/g, '') === 'bot-2') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      description: jsonData[randomNumber].deskripsi,
			      category: "bot-2"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/caklontong.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-4') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-4"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/siapakahaku.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-5') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-5"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, `Soal: ${jsonData[randomNumber].soal}\nType: ${jsonData[randomNumber].tipe}`)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/susunkata.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-6') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].img,
			      answer: jsonData[randomNumber].name,
			      category: "bot-6"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    const media = await MessageMedia.fromUrl(chat.question)

			    client.sendMessage(message.from, media)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebakbendera.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-7') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].img,
			      answer: jsonData[randomNumber].jawaban,
			      description: jsonData[randomNumber].deskripsi,
			      category: "bot-7"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    const media = await MessageMedia.fromUrl(chat.question)

			    client.sendMessage(message.from, media)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebakgambar.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-8') {
			client.sendMessage(message.from, "Not working😠...")
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-9') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-9"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebakkalimat.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-10') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-10"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebakkata.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-11') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].lambang,
			      answer: jsonData[randomNumber].unsur,
			      category: "bot-11"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebakkimia.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-12') {
			{
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].link_song,
			      answer: jsonData[randomNumber].jawaban,
			      description: `artist: ${jsonData[randomNumber].artist}`,
			      category: "bot-12"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean();

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    const media = await MessageMedia.fromUrl(jsonData[randomNumber].link_song, {unsafeMime: true});
			    client.sendMessage(message.from, media)

			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebaklagu.json', 'utf8', handleChatData)
		}
	}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-13') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-13"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebaklirik.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-14') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-14"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tebaktebakan.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-15') {
			const handleChatData = async (err, data) => {
			  try {
			    if (err) throw new Error(err);

			    // Parse JSON data
			    const jsonData = JSON.parse(data);

			    const randomNumber = Math.floor(Math.random() * jsonData.length);
			    const chat = new Chat({
			      question: jsonData[randomNumber].soal,
			      answer: jsonData[randomNumber].jawaban,
			      category: "bot-15"
			    });

			    const existingChat = await Chat.findOne({ question: chat.question }).lean();

			    if (!existingChat) {
			      // Save new chat only if the question doesn't exist
			      await chat.save();
			    }

			    const waUser = new WhatsappUser({
			      waNumber: message.from,
			      name: message._data.notifyName,
			    });
			    // Menyimpan ID chat ke dalam array waUser.chat tanpa menggantikan yang sudah ada
					waUser.chats.addToSet(chat._id);

			    const existingUser = await WhatsappUser.findOne({ waNumber: waUser.waNumber }).lean()

			    if (!existingUser) {
			      // Save new user only if the user doesn't exist
			      await waUser.save();
			    } else {
			      console.log("User already exists");
			    }

			    client.sendMessage(message.from, chat.question)
			  } catch (error) {
			    console.error('Error:', error.message);
			  }
			};
			fs.readFile('./constants/tekateki.json', 'utf8', handleChatData)
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-16') {
			fs.readFile('./constants/bucin.json', 'utf8', (err, data) => {
				if(err) throw new Error;
				//Parse Json data
				const jsonData = JSON.parse(data);

				const randomNumber = Math.floor(Math.random() * jsonData.length);
				client.sendMessage(message.from, `\`\`\`${jsonData[randomNumber]}\`\`\``)
			})
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-17') {
			fs.readFile('./constants/motivasi.json', 'utf8', (err, data) => {
				if(err) throw new Error;
				//Parse Json data
				const jsonData = JSON.parse(data);

				const randomNumber = Math.floor(Math.random() * jsonData.length);
				client.sendMessage(message.from, `\`\`\`${jsonData[randomNumber]}\`\`\``)
			})
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-18') {
			fs.readFile('./constants/renungan.json', 'utf8', (err, data) => {
				if(err) throw new Error;
				//Parse Json data
				const jsonData = JSON.parse(data);

				const randomNumber = Math.floor(Math.random() * jsonData.length);
				const getMedia = async() => {
					return await MessageMedia.fromUrl(jsonData[randomNumber]);
				}
				getMedia()
					.then(media => {
						client.sendMessage(message.from, media)
					})
			})
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-19') {
			fs.readFile('./constants/truth.json', 'utf8', (err, data) => {
				if(err) throw new Error;
				//Parse Json data
				const jsonData = JSON.parse(data);

				const randomNumber = Math.floor(Math.random() * jsonData.length);
				client.sendMessage(message.from, `\`\`\`${jsonData[randomNumber]}\`\`\``)
			})
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-20') {
			fs.readFile('./constants/dare.json', 'utf8', (err, data) => {
				if(err) throw new Error;
				//Parse Json data
				const jsonData = JSON.parse(data);

				const randomNumber = Math.floor(Math.random() * jsonData.length);
				client.sendMessage(message.from, `\`\`\`${jsonData[randomNumber]}\`\`\``)
			})
		}
		else if(message.body.toLowerCase().replace(/\s/g, '') === 'bot-21') {
			fs.readFile('./constants/quotes.json', 'utf8', (err, data) => {
				if(err) throw new Error;
				//Parse Json data
				const jsonData = JSON.parse(data);

				const randomNumber = Math.floor(Math.random() * jsonData.length);
				client.sendMessage(message.from, `\`\`\`${jsonData[randomNumber].text}\`\`\`\n_By: ${jsonData[randomNumber].author}_`)
			})
		} else {
			const handleAllChat = async () => {
				const botRequester = await WhatsappUser.findOne({ waNumber: message.from })
				if(!botRequester) {
					return;
				} else {
					const latestChat = await Chat.findOne({}, {}, { sort: { 'createdAt': -1 } })
					if(latestChat.category === 'bot-1' || latestChat.category === 'bot-4' || latestChat.category === 'bot-5' || latestChat.category === 'bot-6' || latestChat.category === 'bot-9' || latestChat.category === 'bot-10' || latestChat.category === 'bot-11' || latestChat.category === 'bot-13' || latestChat.category === 'bot-14' || latestChat.category === 'bot-15') {
						const correctAnswer = latestChat.answer.toLowerCase() === message.body.toLowerCase();
						if(correctAnswer) {
							client.sendMessage(message.from, `Bravo! Anda sudah menjawab dengan benar!\nSelamat anda berhak mendapatkan sebuah *HADIAH* yang akan dikirimkan ke rumah anda, jika tidak datang juga berarti anda sudah tertipu`);
						} else {
							client.sendMessage(message.from, `Sayang sekali jawaban anda masih salah\nJawaban: *${latestChat.answer}*`)
						}
					} else if(latestChat.category === 'bot-2' || latestChat.category === 'bot-7' || latestChat.category === 'bot-12') {
						const correctAnswer = latestChat.answer.toLowerCase() === message.body.toLowerCase();
						if(correctAnswer) {
							client.sendMessage(message.from, `${latestChat.description}\nBravo! Anda sudah menjawab dengan benar!\nSelamat anda berhak mendapatkan sebuah *HADIAH* yang akan dikirimkan ke rumah anda, jika tidak datang juga berarti anda sudah tertipu`);
						} else {
							client.sendMessage(message.from, `Sayang sekali jawaban anda masih salah\nJawaban: *${latestChat.answer}*\n👉: ${latestChat.description}`)
						}
					}
				}
			}
			handleAllChat()
		}
	});
	client.initialize();
})

module.exports = { botResponse }