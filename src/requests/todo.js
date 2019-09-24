const { post, get } = require('../API')

const sendPost = ({ userId, title, body }) =>
  post('/posts', { userId, title, body }).then(({ data }) => data)

const getTodos = () => get('/todos/1').then(({ data }) => data)

const getPosts = () => get('/posts').then(({ data }) => data)

const getPostsId = (posts) => {
	if (!Array.isArray(posts) || !posts.some(post=> post.id)) return false

  return posts.map((post) => post.id).join(', ')
}

module.exports = {
  getPosts,
  getTodos,
  sendPost,
  getPostsId
}
