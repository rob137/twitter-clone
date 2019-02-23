const express = require('express');
const cors = require('cors');

const port = 5001;
const app = express();

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
    res.json(tweet);
  } else {
    res.json({ message: 'Name and content are required!'});
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
