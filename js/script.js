const postsList = document.querySelector('.posts__list');
const getPostsBtn = document.querySelector('.posts__get-posts');

const state = {
  posts: [],
}

const createPost = (post, index) => `
  <div class="post">
    <div class="post__wrapper">
      <h1 class="wrapper__title">${post.title}</h1>
      <div class="wrapper__body">${post.body}</div>
    </div>
    <div class="post__buttons">
      <button class="buttons__edit" onclick="editPost(${index})">Edit</button>
      <button class="buttons__delete" onclick="deletePost(${index})">Delete</button>
    </div>
  </div>
`

const fillPostsList = (posts) => {
  postsList.innerHTML = '';

  if (posts.length) {
    posts.forEach((post, index) => postsList.innerHTML += createPost(post, index));
  }
}

getPostsBtn.addEventListener('click', async function() {
  await getPostRequest();
  fillPostsList(state.posts);
})

function getPostRequest() {
  return fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    headers: {
      'Content-type': 'application/json; charset=UTF-8' 
    }
  })
  .then((result) => result.json())
  .then((posts) => state.posts = state.posts.concat(posts))
}