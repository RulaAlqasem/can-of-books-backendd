const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/books',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const BookSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String
});
const UserSchema = new mongoose.Schema({
  email: String,
  books: [BookSchema]

});
 const Book = mongoose.model('Book', BookSchema);
const User = mongoose.model('User', UserSchema);


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

// bookCollection();

function getUser(request, response)  {
  // response.send(' All is good!');
  const { email } = request.query;
 
  User.find({email: email }, function (err, user1) {
      if (err) res.send('didnt work');
    
      response.send(user1[0].books);
  });
 

}

module.exports=getUser;