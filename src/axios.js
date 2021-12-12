const axios = require('axios');

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const omdb = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

export default instance;
export { omdb };