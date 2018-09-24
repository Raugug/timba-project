require('dotenv').config();
const mongoose =require('mongoose');
const User = require('../models/user');


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
  totalGames: 20,
  validGames: 7,
  //location: { type: { type: String }, coordinates: [Number] }
},
{
  username: 'king1',
  email: 'king@gmail.com',
  password: '4567',
  isHost:  true,
  photo: '../public/images/testImgs/perfil02.jpg',
  level: 3,
  //reviews: [reviewSchema.schema],
  stats: [4,4,4,5], // [v1, v2, v3, v4]
  //requests: [requestSchema.schema],
  totalGames: 20,
  validGames: 15,
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
  totalGames: 50,
  validGames: 7,
  //location: { type: { type: String }, coordinates: [Number] }
},
{
  username: 'raul', 
  email: 'raul@gmail.com',
  password: '9876',
  isHost:  true,
  photo: '../public/images/testImgs/perfil04.jpg',
  level: 4,
  //reviews: [reviewSchema.schema],
  stats: [4,4,5,5], // [v1, v2, v3, v4]
  //requests: [requestSchema.schema],
  totalGames: 100,
  validGames: 78,
  //location: { type: { type: String }, coordinates: [Number] }
},
{
  username: 'gabi', 
  email: 'gabi@gmail.com',
  password: 'qwerty',
  isHost:  false,
  photo: '../public/images/testImgs/perfil05.jpg',
  level: 4,
  //reviews: [reviewSchema.schema],
  stats: [3,4,5,2], // [v1, v2, v3, v4]
  //requests: [requestSchema.schema],
  totalGames: 25,
  validGames: 5,
  //location: { type: { type: String }, coordinates: [Number] }
}
];

mongoose.connect(process.env.DBURL);
User.collection.drop();

// .then(() => console.log('DB clera'));

User.create(userTest, (err) => {
  if(err) {throw (err)}
  console.log(`Created ${userTest.length} users`)
  mongoose.disconnect()

});

// .then( (err)=> {
// })
// .catch((err) => { console.log(err)});



