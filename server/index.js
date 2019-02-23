const express = require('express');

const port = 5001;
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Request received'
  })
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
