import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/serviceIntervalService';

import ServiceInterval from '../models/ServiceInterval';
import { validateServiceInterval } from '../validations/serviceInterval';

class ServiceIntervalStore {
  @observable serviceInterval = new ServiceInterval();

  @observable currentPage = 1;
  @observable pageSize = 5;
  @observable totalItems = 0;
  @observable totalPages = 0;

  @observable mileageGreaterThanOrEqual = '';
  @observable mileageLessThanOrEqual = '';
  @observable loading = false;
  @observable serviceIntervals = null;
  @observable errors = {};

  @action
  onPageChange = (page, params) => {
    this.currentPage = page;
    this.find(params);
  }

  @action
  findOne = async (id, embeds) => {
    try {
      const res = await service.findOne(id, embeds);
      this.serviceInterval = _.pick(res.data, ['maximumMileage', 'vehicleModelId', 'serviceTypeId']);
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  find = async (searchTerm, embeds, sorting, paging) => {
    try {
      this.loading = true;
      const from = this.mileageGreaterThanOrEqual > 0 ? this.mileageGreaterThanOrEqual : null;
      const to = this.mileageLessThanOrEqual > 0 ? this.mileageLessThanOrEqual : null;

      const res = await service.find(searchTerm, embeds, sorting, paging, from, to);
      if (!_.isEmpty(res.data.data)) {
        this.serviceIntervals = res.data.data;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
        this.totalItems = res.data.totalItems;
        this.totalPages = res.data.totalPages;
      }
      else {
        this.serviceIntervals = null;
      }
      this.loading = false;
    } catch (error) {
      this.errors = error.response.data;
      this.loading = false;
    }
  }

  @action
  saveServiceInterval = async (history) => {
    const { errors, isValid } = validateServiceInterval(this.serviceInterval);
    if (!isValid) return this.errors = errors;

    try {
      this.errors = {};
      await service.save([this.serviceInterval]);
      this.refreshStateToInitialValue();

      history.push('/car-service-interval');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  updateServiceInterval = async (id, history) => {
    const { errors, isValid } = validateServiceInterval(this.serviceInterval);
    if (!isValid) return this.errors = errors;

    try {
      await service.update(id, this.serviceInterval);
      history.push('/car-service-interval');
      this.refreshStateToInitialValue();
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  onRemoveServiceInterval = async (id) => {
    try {
      await service.remove(id);
      _.remove(this.serviceIntervals, e => e.id === id);
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  onChange = (e) => {
    this.serviceInterval[e.target.name] = e.target.value;
  }

  @action
  onNumberValueChange = (e) => {
    this[e.target.name] = parseInt(e.target.value, 10);
  }

  @action
  onCheck = (e) => {
    this.serviceInterval.serviceTypeId = e.target.id;
  }

  @action
  refreshStateToInitialValue = () => {
    this.serviceInterval.maximumMileage = '';
    this.serviceInterval.vehicleModelId = '';
    this.serviceInterval.serviceTypeId = '';
    this.serviceIntervals = null;
    this.errors = {};
  }
}

const serviceIntervalStore = new ServiceIntervalStore();

export default serviceIntervalStore;