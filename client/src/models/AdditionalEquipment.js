import { observable } from 'mobx';

export class AdditionalEquipment {
  @observable name = '';
  @observable description = '';
  @observable equipmentname = '';
  @observable equipmentAttributes = [];
}