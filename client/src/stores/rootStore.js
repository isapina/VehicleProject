import AdditionalEquipmentStore from './AdditionalEquipmentStore';
import ServiceTypeStore from './ServiceTypeStore';
import ServiceIntervalStore from './ServiceIntervalStore';
import FilterStore from './FilterStore';
import EmbedsStore from './EmbedsStore';

const rootStore = {
  equipment: AdditionalEquipmentStore,
  serviceType: ServiceTypeStore,
  serviceInterval: ServiceIntervalStore,
  filter: FilterStore,
  embeds: EmbedsStore
}

export default rootStore;