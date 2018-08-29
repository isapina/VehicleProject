import { action, observable } from 'mobx';
import axios from '../axios';

const rootURL = "/api/additional-equipments";
const embeds = "equipmentattributes";

class AdditionalEquipmentsStore {
  @observable additionalEquipments = [];
  @observable errors = {};

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

const additionalEquipmentStore = new AdditionalEquipmentsStore();

export default additionalEquipmentStore;