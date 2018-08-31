import axios from '../axios';

const rootURL = "/api/additional-equipments";

export const find = async ({ embeds = null, searchTerm = null, ascending = true, orderBy = 'id', pageNumber = null, pageSize = null } = {}) => {
  try {
    return await axios.get(`${rootURL}?embeds=${embeds}&serchTerm=${searchTerm}&ascending=${ascending}&pageNumbe=${pageNumber}&pageSize=${pageSize}`);
  } catch (error) {
    return error.response.data;
  }
}

export const findOne = async (id, embeds = '') => {
  try {
    return await axios.get(`${rootURL}/${id}?embeds=${embeds}`);
  }
  catch (error) {
    return error.response.data;
  }
}

export const save = async (data) => {
  try {
    return await axios.post(rootURL, data);
  } catch (error) {
    return error.response.data;
  }
}

export const update = async (id, data) => {
  try {
    return await axios.post(`${rootURL}/${id}/attributes`, data);
  } catch (error) {
    return error.response.data;
  }
}

export const remove = async (id) => {
  try {
    return await axios.delete(`${rootURL}/${id}`);
  } catch (error) {
    return error.response.data;
  }
}