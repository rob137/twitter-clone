const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const POST_URL = 'http://localhost:5001/tweets';


loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const content = formData.get('content');
  const tweet = { name, content };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(POST_URL, {
    method: 'POST',
    body: tweet,
    header: {
      'content-type': 'application/json',
    },
  });  
});
