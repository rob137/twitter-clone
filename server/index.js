const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const port = 5001;
const app = express();
const db = monk('localhost/tweet-clone');
const tweets = db.get('tweets');
const filter = new Filter();

app.use(cors());
app.use(express.json());

const getTweetsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limite each IP to 100 requests per windowMs
});

const postTweetLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
});

const isValid = (tweet) => {
  return tweet.name && tweet.name.toString().trim() !== '';
}

app.get('/tweets', getTweetsLimiter, (req, res) => {
  tweets
    .find()
    .then(tweets => res.json(tweets));
});

app.post('/tweets', postTweetLimiter, (req, res) => {
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

app.delete('/tweets/:id', (req, res) => {
  const id = req.params.id;
  tweets.remove({ _id: id })
  .then(outcome => {
    if (outcome.result.ok === 1) {
      res.status(200);
      res.json({ message: `Tweet deleted!`});
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
