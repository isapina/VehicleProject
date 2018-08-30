import _ from 'lodash';
import { action, observable } from 'mobx';
import axios from '../axios';

const rootURL = "/api/additional-equipments";
const embeds = "equipmentattributes";

class AdditionalEquipmentStore {
  @observable additionalEquipment = {
    name: '',
    description: '',
    equipmentname: '',
    equipmentAttributes: []
  }
  @observable additionalEquipments = [];
  @observable errors = {};

  @action saveAdditionalEquipment = async (e, history) => {
    e.preventDefault();

    const data = [{
      name: this.additionalEquipment.name,
      description: this.additionalEquipment.description,
      equipmentAttributes: _.map(this.additionalEquipment.equipmentAttributes, _.partialRight(_.pick, 'name'))
    }];

    try {
      await axios.post(rootURL, data);
      this.refreshStateToInitialValue();

      history.push('/additional-equipment');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action loadEquipmentData = async (id) => {
    try {
      const res = await axios.get(`${rootURL}/${id}?embeds=${embeds}`);
      this.additionalEquipment.equipmentAttributes = res.data.equipmentAttributes;
      this.additionalEquipment.description = res.data.description;
      this.additionalEquipment.name = res.data.name;

    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action updateAdditionalEquipment = async (e, id, history) => {
    e.preventDefault();

    try {
      await axios.post(`${rootURL}/${id}/attributes`, this.additionalEquipment.equipmentAttributes);
      this.refreshStateToInitialValue();

      history.push('/additional-equipment');
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action onChange = (e) => {
    this.additionalEquipment[e.target.name] = e.target.value;
  }

  @action addNewEquipmentAttribute = (e) => {
    e.preventDefault();

    const newEquipmentAttributes = this.additionalEquipment.equipmentAttributes;
    newEquipmentAttributes.push({ name: this.additionalEquipment.equipmentname, id: Math.random() });

    this.additionalEquipment.equipmentAttributes = newEquipmentAttributes;
    this.additionalEquipment.equipmentname = '';
  };

  @action removeFromList = (id) => {
    _.remove(this.additionalEquipment.equipmentAttributes, e => e.id === id);
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
      _.remove(this.additionalEquipments, e => e.id === id);
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action onSelect = (id, history) => {
    history.push(`/additional-equipment/${id}`);
  }

  @action refreshStateToInitialValue = () => {
    this.additionalEquipment.name = '';
    this.additionalEquipment.description = '';
    this.additionalEquipment.equipmentname = '';
    this.additionalEquipment.equipmentAttributes = [];
    this.additionalEquipment.errors = {};
  }
}

const additionalEquipmentStore = new AdditionalEquipmentStore();

export default additionalEquipmentStore;