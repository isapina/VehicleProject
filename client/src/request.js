import axios from './axios';

const get = async (apiEndpoint) => {
  return await axios.get(apiEndpoint);
}

const post = async (apiEndpoint, data) => {
  return await axios.post(apiEndpoint, data);
}

const put = async (apiEndpoint, data) => {
  return await axios.put(apiEndpoint, data);
}

const remove = async (apiEndpoint) => {
  return await axios.delete(apiEndpoint);
}

export const request = {
  get,
  post,
  put,
  remove
}