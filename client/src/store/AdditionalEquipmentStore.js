import _ from 'lodash';
import { action, observable } from 'mobx';
import axios from '../axios';

const rootURL = "/api/additional-equipments";
const embeds = "equipmentattributes";

class AdditionalEquipmentStore {
  @observable name = '';
  @observable description = '';
  @observable equipmentname = '';
  @observable equipmentAttributes = [];
  @observable additionalEquipments = [];
  @observable errors = {};

  @action saveAdditionalEquipment = async (e, history) => {
    e.preventDefault();

    const data = [{
      name: this.name,
      description: this.description,
      equipmentAttributes: _.map(this.equipmentAttributes, _.partialRight(_.pick, 'name'))
    }];

    try {
      await axios.post(rootURL, data);
      this.name = '';
      this.description = '';
      this.equipmentname = '';
      this.equipmentAttributes = [];
      this.errors = {};

      history.push('/additional-equipment');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action loadEquipmentData = async (id) => {
    try {
      const res = await axios.get(`${rootURL}/${id}?embeds=${embeds}`);
      this.equipmentAttributes = res.data.equipmentAttributes;
      this.description = res.data.description;
      this.name = res.data.name;

    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action updateAdditionalEquipment = async (e, id, history) => {
    e.preventDefault();

    try {
      await axios.post(`${rootURL}/${id}/attributes`, this.equipmentAttributes);
      this.name = '';
      this.description = '';
      this.equipmentname = '';
      this.equipmentAttributes = [];
      this.errors = {};

      history.push('/additional-equipment');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action onChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  @action addNewEquipmentAttribute = (e) => {
    e.preventDefault();

    const newEquipmentAttributes = this.equipmentAttributes;
    newEquipmentAttributes.push({ name: this.equipmentname, id: Math.random() });

    this.equipmentAttributes = newEquipmentAttributes;
    this.equipmentname = '';
  };

  @action removeFromList = (id) => {
    const newEquipmentAttributes = this.equipmentAttributes.filter(e => e.id !== id);
    this.equipmentAttributes = newEquipmentAttributes;
  }

  @action fetchData = async () => {
    try {
      const res = await axios.get(`${rootURL}?embeds=${embeds}`);
      this.additionalEquipments = res.data.data;
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action onRemoveAdditionalEquipment = async (id) => {
    try {
      await axios.delete(`/api/additional-equipments/${id}`);
      const newAdditionalEquipments = this.additionalEquipments.filter(e => e.id !== id);
      this.additionalEquipments = newAdditionalEquipments;
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action onSelect = (id, history) => {
    history.push(`/additional-equipment/${id}`);
  }
}

const additionalEquipmentStore = new AdditionalEquipmentStore();

export default additionalEquipmentStore;