import _ from 'lodash';
import axios from '../axios';

const rootURL = "/api/service-intervals";

export const find = async (params = '', mileageGreaterThanOrEqual, mileageLessThanOrEqual) => {
  let query = '';
  if (_.isEmpty(params)) {
    query = `?mileageGreaterThanOrEqual=${mileageGreaterThanOrEqual}&mileageLessThanOrEqual=${mileageLessThanOrEqual}`;
  }
  else {
    query = `${params}&mileageGreaterThanOrEqual=${mileageGreaterThanOrEqual}&mileageLessThanOrEqual=${mileageLessThanOrEqual}`;
  }
  return await axios.get(`${rootURL}${query}`);
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