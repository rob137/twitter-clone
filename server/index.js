const express = require('express');
const cors = require('cors');
const monk = require('monk');

const port = 5001;
const app = express();
const db = monk('localhost/tweet-clone');
const tweets = db.get('tweets');

app.use(cors());
app.use(express.json());

const isValid = (tweet) => {
  return tweet.name && tweet.name.toString().trim() !== '';
}

app.get('/', (req, res) => {
  res.json({
    message: 'Request received'
  });
});

app.post('/tweets', (req, res) => {
  if (isValid(req.body)) {
    // insert into db..
    const tweet = {
      name: req.body.name.toString(),
      content: req.body.content.toString(),
    };
    tweets
    .insert(tweet)
    .then(createdTweet => res.json(createdTweet));
  } else {
    res.status(422);
    res.json({ message: 'Name and content are required!'});
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
