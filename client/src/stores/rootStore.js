import AdditionalEquipmentStore from './AdditionalEquipmentStore';
import ServiceTypeStore from './ServiceTypeStore';
import ServiceIntervalStore from './ServiceIntervalStore';

import EmbedsStore from './EmbedsStore';
import SortingStore from './SortingStore';
import SearchBoxStore from './SearchBoxStore';
import PaginationStore from './PaginationStore';

const rootStore = {
  equipment: AdditionalEquipmentStore,
  serviceType: ServiceTypeStore,
  serviceInterval: ServiceIntervalStore,
  embeds: EmbedsStore,
  sorting: SortingStore,
  search: SearchBoxStore,
  pagination: PaginationStore
}

export default rootStore;