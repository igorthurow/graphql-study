const axios = require('axios')

const axiosInstance = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com'
})

module.exports = axiosInstance

