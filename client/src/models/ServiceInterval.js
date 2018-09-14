import { observable } from 'mobx';

export default class ServiceInterval {
  @observable maximumMileage = '';
  @observable vehicleModelId = '';
  @observable serviceTypeId = '';
}