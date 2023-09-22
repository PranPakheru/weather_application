import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.weatherapi.com/v1',
    timeout: 30000,
  });

  export default instance;