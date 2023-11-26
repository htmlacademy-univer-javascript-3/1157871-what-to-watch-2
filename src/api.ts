import axios, {AxiosInstance} from 'axios';
import {millisecondsInSecond} from 'date-fns';


const API_ROOT = 'https://13.design.pages.academy/wtw';
const TIMEOUT = millisecondsInSecond * 5;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_ROOT,
    timeout: TIMEOUT,
  });

  return api;
};
