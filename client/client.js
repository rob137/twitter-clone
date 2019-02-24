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
    .then(() => showAllTweets())
    .catch((err) => console.error(err));
});

function showAllTweets() {
  tweetsElement.innerHTML = '';
  fetch(API_URL, { method: 'GET' })
    .then(response => response.json())
    .then(tweets => {
      loadingElement.style.display = 'none';
      tweets.reverse();
      tweets.forEach(tweet => {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        div.setAttribute('_id', tweet._id);

        h3.textContent = tweet.name;
        p.textContent = tweet.content;

        div.appendChild(h3);
        div.appendChild(p)

        tweetsElement.append(div);
      });
    })
    .catch(err => console.error(err));
};
