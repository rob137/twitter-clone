const express = require('express');
const cors = require('cors');

const port = 5001;
const app = express();

app.use(express.json());

app.use(cors);
app.get('/', (req, res) => {
  res.json({
    message: 'Request received'
  })
})

app.post('/tweets', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
