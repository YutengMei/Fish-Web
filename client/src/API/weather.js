import axios from 'axios';

const KEY = 'af04de9346461375834dfa120b4ed29f';

export default axios.create(
  {
    baseURL: 'http://api.openweathermap.org/data/2.5',
    params: {
      appid: KEY,
    }
  }
);
