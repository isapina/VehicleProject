import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/serviceTypeService';

import { ServiceType } from '../models/ServiceType';
import { validateServiceType } from '../validations/serviceType';

class ServiceTypeStore {
  @observable serviceType = new ServiceType();

  @observable currentPage = 1;
  @observable pageSize = 5;
  @observable totalItems = 0;
  @observable totalPages = 0;

  @observable loading = false;
  @observable serviceTypes = null;
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
      this.serviceType = res.data;
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  find = async (params) => {
    console.log(params);
    try {
      this.loading = true;
      const res = await service.find(params, this.currentPage, this.pageSize);
      if (!_.isEmpty(res.data.data)) {
        this.serviceTypes = res.data.data;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
        this.totalItems = res.data.totalItems;
        this.totalPages = res.data.totalPages;
      }
      else {
        this.serviceTypes = null;
      }
      this.loading = false;
    } catch (error) {
      this.errors = error.response.data;
      this.loading = false;
    }
  }

  @action
  saveServiceType = async (history) => {
    const { errors, isValid } = validateServiceType(this.serviceType);
    if (!isValid) return this.errors = errors;

    try {
      await service.save([this.serviceType]);
      this.refreshStateToInitialValue();

      history.push('/car-service-type');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  updateServiceType = async (id, history) => {
    const { errors, isValid } = validateServiceType(this.serviceType);
    if (!isValid) return this.errors = errors;

    try {
      await service.update(id, this.serviceType);
      this.refreshStateToInitialValue();

      history.push('/car-service-type');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  removeFromList = (id) => {
    _.remove(this.serviceTypes, e => e.id === id);
  }

  @action
  onRemoveServiceType = async (id) => {
    try {
      await service.remove(id);
      _.remove(this.serviceTypes, e => e.id === id);
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  onChange = (e) => {
    this.serviceType[e.target.name] = e.target.value;
  }

  @action
  onMileageChange = (e) => {
    this.serviceType[e.target.name] = e.target.value;
  }

  @action
  onNumberValueChange = (e) => {
    this[e.target.name] = parseInt(e.target.value, 10);
  }

  @action
  onSelect = (id, history) => {
    history.push(`/car-service-type/${id}`);
  }

  @action
  onCheck = (e) => {
    this.serviceType[e.target.name] = !this.serviceType[e.target.name];
  }

  @action
  refreshStateToInitialValue = () => {
    this.serviceType.name = '';
    this.serviceType.oilChangeService = false;
    this.serviceType.ntervalService = false;
    this.serviceType.inspectionService = false;
    this.serviceType.intervalService = false;
    this.serviceType.brakeFluidChanged = false;
    this.serviceType.longLifeOilUsed = false;
    this.serviceType.atf = false;
    this.serviceType.dsgOilAndFilter = false;
    this.serviceType.naturalGasTankAndPipelines = false;
    this.serviceType.haldexCouplingOil = false;
    this.serviceType.fuelFilter = false;
    this.serviceType.airFilter = false;
    this.serviceType.tirePressureSensors = false;
    this.serviceType.tireFillerBottle = false;
    this.serviceType.dustAndPollenFilter = false;
    this.serviceType.toothedBelt = false;
    this.serviceType.sparkPlugs = false;
    this.serviceTypes = null;
    this.errors = {};
  }
}

const serviceTypeStore = new ServiceTypeStore();

export default serviceTypeStore;