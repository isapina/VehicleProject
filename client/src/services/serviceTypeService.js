import axios from '../axios';

const rootURL = "/api/service-types";

export const find = async (
  searchTerm = '',
  embeds = '',
  { orderBy = 'id', ascending = true } = '',
  { currentPage = 1, pageSize = 5 } = {}
) => {
  const queryString = `searchTerm=${searchTerm}&orderBy=${orderBy}&ascending=${ascending}&embeds=${embeds}&pageNumber=${currentPage}&pageSize=${pageSize}`
  return await axios.get(`${rootURL}?${queryString}`);
}

export const findOne = async (id, embeds = '') => {
  return await axios.get(`${rootURL}/${id}?embeds=${embeds}`);
}

export const save = async (data) => {
  return await axios.post(rootURL, data);
}

export const update = async (id, data) => {
  return await axios.put(`${rootURL}/${id}`, data);
}

export const remove = async (id) => {
  return await axios.delete(`${rootURL}/${id}`);
}