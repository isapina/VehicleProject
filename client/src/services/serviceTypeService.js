import { request } from '../request';

const rootURL = "/api/service-types";

export const find = async (
  searchTerm = '',
  embeds = '',
  { orderBy = 'id', ascending = true } = '',
  { currentPage = 1, pageSize = 5 } = {}
) => {
  const queryString = `searchTerm=${searchTerm}&orderBy=${orderBy}&ascending=${ascending}&embeds=${embeds}&pageNumber=${currentPage}&pageSize=${pageSize}`;

  return await request.get(`${rootURL}?${queryString}`);
}

export const findOne = async (id, embeds = '') => {
  return await request.get(`${rootURL}/${id}?embeds=${embeds}`);
}

export const save = async (data) => {
  return await request.post(rootURL, data);
}

export const update = async (id, data) => {
  return await request.put(`${rootURL}/${id}`, data);
}

export const remove = async (id) => {
  return await request.remove(`${rootURL}/${id}`);
}