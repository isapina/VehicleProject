import axios from './axios';

const get = async (endpoint) => {
  return await axios.get(endpoint);
}

const post = async (endpoint, data) => {
  return await axios.post(endpoint, data);
}

const put = async (endpoint, data) => {
  return await axios.put(endpoint, data);
}

const remove = async (endpoint) => {
  return await axios.delete(endpoint);
}

export const request = {
  get,
  post,
  put,
  delete: remove
}