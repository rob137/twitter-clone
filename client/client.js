const form = document.querySelector('form');
const body = document.querySelector('body');
const tweetsElement = document.querySelector('.tweets');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5001/tweets';

loadingElement.display = '';

showAllTweets();

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');
  const tweet = { name, content };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(tweet),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(createdTweet => {
      console.log(createdTweet);
      form.reset();
      form.style.display = '';
      loadingElement.style.display = 'none';
    })
    .catch((err) => console.error(err));
});

function showAllTweets() {
  fetch(API_URL, { method: 'GET' })
    .then(response => response.json())
    .then(tweets => {
      console.log(tweets);
      loadingElement.style.display = '';
    })
    .catch(err => console.error(err));
};
