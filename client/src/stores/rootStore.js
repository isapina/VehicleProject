import AdditionalEquipmentStore from './AdditionalEquipmentStore';
import ServiceTypeStore from './ServiceTypeStore';
import FilterStore from './FilterStore';

const rootStore = {
  equipment: AdditionalEquipmentStore,
  serviceType: ServiceTypeStore,
  filter: FilterStore
}

export default rootStore;