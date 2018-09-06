import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/serviceIntervalService';

class ServiceIntervalStore {
  @observable serviceInterval = {
    maximumMileage: null,
    vehicleModelId: null,
    serviceTypeId: null
  }
  @observable loading = false;
  @observable serviceIntervals = null;
  @observable errors = {};

  @action
  saveServiceInterval = async (history) => {
    try {
      await service.save([this.serviceInterval]);
      this.refreshStateToInitialValue();

      history.push('/car-service-interval');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  findOne = async (id, embeds) => {
    try {
      const res = await service.findOne(id, embeds);
      this.serviceInterval = res.data;
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
  updateServiceInterval = async (id) => {
    try {
      await service.update(id, this.serviceInterval);
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
  removeFromList = (id) => {
    _.remove(this.serviceIntervals, e => e.id === id);
  }


  @action
  onChange = (e) => {
    this.serviceInterval[e.target.name] = e.target.value;
  }

  @action
  onSelect = (id, history) => {
    history.push(`/car-service-interval/${id}`);
  }

  @action
  refreshStateToInitialValue = () => {
    this.serviceInterval.maximumMileage = null;
    this.serviceInterval.vehicleModelId = null;
    this.serviceInterval.serviceTypeId = null;
    this.serviceIntervals = null;
    this.errors = {};
  }
}

const serviceIntervalStore = new ServiceIntervalStore();

export default serviceIntervalStore;