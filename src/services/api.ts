import axios from 'axios';
import {ToDo} from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getToDos = (): Promise<ToDo[]> => {
  return api
    .get('/todos')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};
