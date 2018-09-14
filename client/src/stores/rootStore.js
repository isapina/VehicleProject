import AdditionalEquipmentStore from './AdditionalEquipmentStore';
import ServiceTypeStore from './ServiceTypeStore';
import ServiceIntervalStore from './ServiceIntervalStore';
import FilterStore from './FilterStore';
import EmbedsStore from './EmbedsStore';
import SortingStore from './SortingStore';

const rootStore = {
  equipment: AdditionalEquipmentStore,
  serviceType: ServiceTypeStore,
  serviceInterval: ServiceIntervalStore,
  filter: FilterStore,
  embeds: EmbedsStore,
  sorting: SortingStore
}

export default rootStore;