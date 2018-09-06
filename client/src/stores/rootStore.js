import AdditionalEquipmentStore from './AdditionalEquipmentStore';
import ServiceTypeStore from './ServiceTypeStore';
import ServiceIntervalStore from './ServiceIntervalStore';
import FilterStore from './FilterStore';

const rootStore = {
  equipment: AdditionalEquipmentStore,
  serviceType: ServiceTypeStore,
  serviceInterval: ServiceIntervalStore,
  filter: FilterStore
}

export default rootStore;