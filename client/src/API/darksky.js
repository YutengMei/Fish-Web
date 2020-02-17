import axios from 'axios';
//const HttpsProxyAgent = require('https-proxy-agent');

export default axios.create(
  {
    baseURL: 'https://api.darksky.net/forecast',
}
);
