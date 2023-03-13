import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ticket-management-system.herokuapp.com/'
});

export default instance;