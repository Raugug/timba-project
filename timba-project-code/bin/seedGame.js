require('dotenv').config();
const mongoose =require('mongoose');
const Game = require('../models/game');


const gameTest = [
  {
    hostId:'5ba8d5b00dfa661376be674c',
    playersNum:  4,
    blinds: '10',
    ante: 10,
    photo: '../uploads/defaultimagegame',
    level: 1,
    //players: [],
    //requests: [requestSchema.schema],
    status:'Players confirmed',
    //status: { type: String, enum: ['Joining', 'Players confirmed', 'Finished', 'Cancelled'], default: 'Joining' },
    date: '2018-10-1',
    time: '20:00',
    description: 'blalallalala ',
    buyIn: '11',
    //location: { type: { type: String }, coordinates: [Number] }
  },
  // {
  //   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  // }
  {
    hostId:'5ba8d5b00dfa661376be674e',
    playersNum:  3,
    blinds: '10',
    ante: 10,
    photo: '../uploads/defaultimagegame',
    level: 1,
    //players: [],
    //requests: [requestSchema.schema],
    status:'Players confirmed',
    //status: { type: String, enum: ['Joining', 'Players confirmed', 'Finished', 'Cancelled'], default: 'Joining' },
    date: '2018-10-1',
    time: '20:00',
    description: 'blalallalala ',
    buyIn: '11',
    //location: { type: { type: String }, coordinates: [Number] }
  },
  // {
  //   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  // }

];

mongoose.connect(process.env.DBURL)
.then(() => {
  //User.collection.drop();
  Game.create(gameTest, (err, game) => {
    if(err) {throw (err)}
    console.log(`Created ${game.length} games`)
    mongoose.disconnect()
  });
})

