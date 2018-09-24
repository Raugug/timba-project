require('dotenv').config();
const mongoose =require('mongoose');
const User = require('..models/user');

mongoose.connect(process.env.DBURL);

const userTest = [
{
  username: 'pepe1',
  email: 'pepe@gmail.com',
  password: '1234',
  isHost:  false,
  photo: '../public/images/testImgs/perfil01.jpg',
  level: 1,
  //reviews: [reviewSchema.schema],
  stats: [1,2,1,2], // [v1, v2, v3, v4]
  //requests: [requestSchema.schema],
  totalGames: 10,
  validGames: 20,
  //location: { type: { type: String }, coordinates: [Number] }
},
{
  username: 'king1',
  email: 'king@gmail.com',
  password: '4567',
  isHost:  true,
  photo: '../public/images/testImgs/perfil02.jpg',
  level: 1,
  //reviews: [reviewSchema.schema],
  stats: [4,4,4,5], // [v1, v2, v3, v4]
  //requests: [requestSchema.schema],
  totalGames: 15,
  validGames: 20,
  //location: { type: { type: String }, coordinates: [Number] }
},
{
  username: 'david',
  email: 'david@gmail.com',
  password: '12345',
  isHost:  false,
  photo: '../public/images/testImgs/perfil03.jpg',
  level: 1,
  //reviews: [reviewSchema.schema],
  stats: [1,2,1,2], // [v1, v2, v3, v4]
  //requests: [requestSchema.schema],
  totalGames: 10,
  validGames: 20,
  //location: { type: { type: String }, coordinates: [Number] }
}

];