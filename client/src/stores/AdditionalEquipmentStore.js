import _ from 'lodash';
import { action, observable } from 'mobx';
import * as service from '../services/additionalEquipmentService';

class AdditionalEquipmentStore {
  @observable additionalEquipment = {
    name: '',
    description: '',
    equipmentname: '',
    equipmentAttributes: []
  }
  @observable loading = false;
  @observable additionalEquipments = null;
  @observable errors = {};

  @action
  saveAdditionalEquipment = async (history) => {
    const { name, description, equipmentAttributes } = this.additionalEquipment;

    try {
      await service.save([{ name, description, equipmentAttributes }]);
      this.refreshStateToInitialValue();

      history.push('/additional-equipment');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  findOne = async (id, embeds) => {
    try {
      const res = await service.findOne(id, embeds);
      this.additionalEquipment.equipmentAttributes = res.data.equipmentAttributes;
      this.additionalEquipment.description = res.data.description;
      this.additionalEquipment.name = res.data.name;

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
        this.additionalEquipments = res.data.data;
      }
      else {
        this.additionalEquipments = [];
      }
      this.loading = false;
    } catch (error) {
      this.errors = error.response.data;
      this.loading = false;
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