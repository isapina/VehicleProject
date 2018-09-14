import { observable } from 'mobx';

export default class AdditionalEquipment {
  @observable name = '';
  @observable description = '';
  @observable equipmentname = '';
  @observable equipmentAttributes = [];
}