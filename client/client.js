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
        const button = document.createElement('button');

        div.className = 'tweet';
        h3.textContent = tweet.name;
        p.textContent = tweet.content;
        button.textContent = 'delete';
        button.className = 'button button-delete'
        button.setAttribute('_id', tweet._id);

        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(button);
        button.addEventListener('click', (e) => {
          e.preventDefault();
          deleteTweet(e.target.getAttribute('_id'));
        });

        tweetsElement.append(div);
      });
    })
    .catch(err => console.error(err));
};

function deleteTweet(id) {
  fetch(API_URL, {
    method: 'DELETE',
    body: { id }
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
}
