import { observable } from 'mobx';

export class ServiceInterval {
  @observable maximumMileage = '';
  @observable vehicleModelId = '';
  @observable serviceTypeId = '';
}