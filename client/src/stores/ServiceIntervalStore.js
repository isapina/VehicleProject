import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/serviceIntervalService';

class ServiceIntervalStore {
  @observable serviceInterval = {
    maximumMileage: '',
    vehicleModelId: '',
    serviceTypeId: ''
  }
  @observable loading = false;
  @observable serviceIntervals = null;
  @observable errors = {};

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
  find = async (params) => {
    try {
      this.loading = true;
      const res = await service.find(params);
      if (!_.isEmpty(res.data.data)) {
        this.serviceIntervals = res.data.data;
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
    try {
      this.errors = {};
      await service.save([this.serviceInterval]);
      this.refreshStateToInitialValue();

      history.push('/car-service-interval');
    } catch (error) {
      if (_.isEmpty(this.serviceInterval.maximumMileage)) {
        this.errors.maximumMileage = "You need to enter maximum mileage for service interval"
      }
      if (_.isEmpty(this.serviceInterval.serviceTypeId)) {
        this.errors.serviceType = "You need to select service type"
      }
      if (_.isEmpty(this.serviceInterval.vehicleModelId)) {
        this.errors.vehicleModelId = "You need select vehicle model"
      }
      if (_.isEmpty(this.serviceInterval.serviceTypeId)) {
        this.errors.serviceType = "You need to select service type"
      }
    }
  }

  @action
  updateServiceInterval = async (id, history) => {
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