import axios from '../axios';

const rootURL = "/api/additional-equipments";

export const find = async (queryString = '') => {
  return await axios.get(`${rootURL}${queryString}`);
}

export const findOne = async (id, embeds = '') => {
  return await axios.get(`${rootURL}/${id}?embeds=${embeds}`);
}

export const save = async (data) => {
  return await axios.post(rootURL, data);
}

export const update = async (id, data) => {
  return await axios.post(`${rootURL}/${id}/attributes`, data);
}

export const remove = async (id) => {
  return await axios.delete(`${rootURL}/${id}`);
}