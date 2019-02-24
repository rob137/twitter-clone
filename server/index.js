2const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const port = 5001;
const app = express();
const db = monk('localhost/tweet-clone');
const tweets = db.get('tweets');
const filter = new Filter();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 300 // limite each IP to 300 requests per windowMs
})

app.use(cors());
app.use(express.json());
app.use (limiter);

const isValid = (tweet) => {
  return tweet.name && tweet.name.toString().trim() !== '';
}

app.get('/', (req, res) => {
  res.json({
    message: 'Request received'
  });
});

app.get('/tweets', (req, res) => {
  tweets
    .find()
    .then(tweets => res.json(tweets));
});

app.post('/tweets', (req, res) => {
  if (isValid(req.body)) {
    // sanitise swearwords and insert into db..
    const tweet = {
      name: filter.clean(req.body.name.toString()),
      content: filter.clean(req.body.content.toString()),
    };
    tweets
      .insert(tweet)
      .then(createdTweet => res.json(createdTweet));
  } else {
    res.status(422);
    res.json({ message: 'Name and content are required!' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
