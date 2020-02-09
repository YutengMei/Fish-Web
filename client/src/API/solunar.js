import axios from 'axios';


export default axios.create(
  {
    baseURL: 'https://api.solunar.org/solunar',
  }
);
