const axiosInstance = require('../API')

const sendPost = (params) =>
  axiosInstance.post('/posts', params).then((response) => response.data)

const getTodos = () =>
  axiosInstance.get('/todos/1').then((response) => response.data)

const getPosts = () =>
  axiosInstance.get('/posts').then((response) => response.data)

module.exports = {
  getPosts,
  getTodos,
  sendPost
}
