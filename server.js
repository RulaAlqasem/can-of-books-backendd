'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa');

const User = require('./models/User');
const app = express();
app.use(cors());

app.use(express.json());


const mongoose = require('mongoose');




const PORT = process.env.PORT || 3003;

function bookCollection() {
  const rula = new User({
    email: 'jaradatrula6@gmail.com',
    books: [
      {
        name: 'The Siege',
        description: 'The Levin family battle against starvation in this novel set during the German siege of Leningrad. Anna digs tank traps and dodges patrols as she scavenges for wood, but the hand of history is hard to escape.',
        status: 'book one'
      },
      {
        name: 'Light',
        description: 'One of the most underrated prose writers demonstrates the literary firepower of science fiction at its best. Three narrative strands – spanning far-future space opera, contemporary unease and virtual-reality pastiche – are braided together for a breathtaking metaphysical voyage in pursuit of the mystery at the heart of reality.',
        status: 'book two'
      }
    ]
  });
  const ameen = new User({
    email: 'ameenbassam111@gmail.com',
    books: [
      {
        name: 'The God Delusion',
        description: 'A key text in the days when the “New Atheism” was much talked about, The God Delusion is a hard-hitting attack on religion, full of Dawkins’s confidence that faith produces fanatics and all arguments for God are ridiculous. What the evolutionary biologist lacks in philosophical sophistication, he makes up for in passion, and the book sold in huge numbers.',
        status: 'book one'
      },
      {
        name: 'The Cost of Living',
        description: 'Chaos is supposed to be what we most fear but I have come to believe it might be what we most want ... ” The second part of Levy’s “living memoir”, in which she leaves her marriage, is a fascinating companion piece to her deep yet playful novels. Feminism, mythology and the daily grind come together for a book that combines emotion and intellect to dazzling effect.',
        status: 'book two'
      }
    ]
  });

 rula.save();
ameen.save();
}

function createBook(req, res) {
  console.log(req.body);
  const { name,  description,status,email } = req.body;
User.find({ email: email }, (error, ownerData) => {
      ownerData[5].books.push({
          name: name,
          description: description,
          status:status,
          email:email
      })
      ownerData[5].save();
      res.send(ownerData[5].books);
  });
}

bookCollection();

function getUser(request, response)  {
  
  const { email } = request.query;
 
  User.find({email: email }, function (err, user1) {
      if (err) response.send('didnt work');
    
      response.send(user1[5].books);
  });
 

}

function deleteBooks(req, res) {
 
  const index = Number(req.params.index);
 
  
  const { email} = req.query;
  
 User.find({email: email}, (err, ownerData) => {
      
try {
  const newBookArr = ownerData[5].books.filter((books, idx) => {
    return idx !== index
});
ownerData[5].books = newBookArr;
ownerData[5].save();
res.send(ownerData[5].books);
} catch (error) {
  console.log(error);
}
if (err) {res.send(`YOU GOT AN ERROR! your error: ${err}`)};  

     
  });
}
app.get('/books', getUser)
app.post('/books', createBook);
app.delete('/books/:index', deleteBooks);

app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})
app.listen(PORT, () => console.log(`listening on ${PORT}`));
