import axios, {AxiosInstance} from 'axios';
import {millisecondsInMinute} from 'date-fns';


const API_ROOT = 'https://13.design.pages.academy/wtw';
const TIMEOUT = millisecondsInMinute * 5;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_ROOT,
    timeout: TIMEOUT,
  });

  return api;
};
