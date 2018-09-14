import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/additionalEquipmentService';

import AdditionalEquipment from '../models/AdditionalEquipment';
import { validateAdditionalEquipment } from '../validations/additionalEquipment';

class AdditionalEquipmentStore {
  @observable additionalEquipment = new AdditionalEquipment();

  @observable currentPage = 1;
  @observable pageSize = 5;
  @observable totalItems = 0;
  @observable totalPages = 0;

  @observable loading = false;
  @observable additionalEquipments = null;
  @observable errors = {};

  @action
  onPageChange = (page, params) => {
    this.currentPage = page;
    this.find(params);
  }

  @action
  find = async (searchTerm, embeds, sorting, paging) => {
    try {
      this.loading = true;
      const res = await service.find(searchTerm, embeds, sorting, paging);
      console.log({ res });
      if (!_.isEmpty(res.data.data)) {
        this.additionalEquipments = res.data.data;
        this.currentPage = res.data.currentPage;
        this.pageSize = res.data.pageSize;
        this.totalItems = res.data.totalItems;
        this.totalPages = res.data.totalPages;
      }
      else {
        this.additionalEquipments = null;
      }
      this.loading = false;
    } catch (error) {
      this.errors = error.response.data;
      this.loading = false;
    }
  }

  @action
  findOne = async (id, embeds) => {
    try {
      const res = await service.findOne(id, embeds);
      this.additionalEquipment = _.pick(res.data, ['equipmentAttributes', 'name', 'description']);

    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  saveAdditionalEquipment = async (history) => {
    const { name, description, equipmentAttributes } = this.additionalEquipment;

    const { errors, isValid } = validateAdditionalEquipment(this.additionalEquipment);
    if (!isValid) return this.errors = errors;

    try {
      await service.save([{ name, description, equipmentAttributes }]);
      this.refreshStateToInitialValue();

      history.push('/additional-equipment');
    } catch (error) {
      this.errors = error.response.data;
    }
  }


  @action
  updateAdditionalEquipment = async (id) => {
    try {
      await service.update(id, this.additionalEquipment.equipmentAttributes);
      this.refreshStateToInitialValue();
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  onNumberValueChange = (e) => {
    this[e.target.name] = parseInt(e.target.value, 10);
  }

  @action
  onChange = (e) => {
    this.additionalEquipment[e.target.name] = e.target.value;
  }

  @action
  addNewEquipmentAttribute = () => {
    this.additionalEquipment.equipmentAttributes.push({ name: this.additionalEquipment.equipmentname, id: Math.random() });;
    this.additionalEquipment.equipmentname = '';
    this.errors.equipmentname = '';
  };

  @action
  removeFromList = (id) => {
    _.remove(this.additionalEquipment.equipmentAttributes, e => e.id === id);
  }

  @action
  onRemoveAdditionalEquipment = async (id) => {
    try {
      await service.remove(id);
      _.remove(this.additionalEquipments, e => e.id === id);
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  onSelect = (id, history) => {
    history.push(`/additional-equipment/${id}`);
  }

  @action
  refreshStateToInitialValue = () => {
    this.additionalEquipment.name = '';
    this.additionalEquipment.description = '';
    this.additionalEquipment.equipmentname = '';
    this.additionalEquipment.equipmentAttributes = [];
    this.additionalEquipments = null;
    this.errors = {};
  }
}

const additionalEquipmentStore = new AdditionalEquipmentStore();

export default additionalEquipmentStore;