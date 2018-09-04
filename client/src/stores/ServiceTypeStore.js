import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/serviceTypeService';

class ServiceTypeStore {
  @observable serviceType = {
    name: '',
    oilChangeService: false,
    intervalService: false,
    inspectionService: false,
    brakeFluidChanged: false,
    longLifeOilUsed: false,
    atf: false,
    dsgOilAndFilter: false,
    naturalGasTankAndPipelines: false,
    haldexCouplingOil: false,
    fuelFilter: false,
    airFilter: false,
    tirePressureSensors: false,
    tireFillerBottle: false,
    dustAndPollenFilter: false,
    toothedBelt: false,
    sparkPlugs: false
  }
  @observable loading = false;
  @observable serviceTypes = [];
  @observable errors = {};

  @action
  saveServiceType = async (history) => {
    try {
      await service.save([this.serviceType]);
      this.refreshStateToInitialValue();

      history.push('/car-service-type');
    } catch (error) {
      this.errors = error.response.data;
    }
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
    try {
      this.loading = true;
      const res = await service.find(params);
      if (!_.isEmpty(res.data.data)) {
        this.serviceTypes = res.data.data;
      }
      else {
        this.serviceTypes = [];
      }
      this.loading = false;
    } catch (error) {
      this.errors = error.response.data;
      this.loading = false;
    }
  }

  @action
  updateServiceType = async (id) => {
    try {
      await service.update(id, this.serviceType);
      this.refreshStateToInitialValue();
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
    this.serviceType.sparkPlugs = false
    this.serviceTypes = [];
    this.errors = {};
  }
}

const serviceTypeStore = new ServiceTypeStore();

export default serviceTypeStore;