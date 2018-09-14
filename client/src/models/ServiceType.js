import { observable } from 'mobx';

export default class ServiceType {
  @observable name = '';
  @observable oilChangeService = false;
  @observable intervalService = false;
  @observable inspectionService = false;
  @observable brakeFluidChanged = false;
  @observable longLifeOilUsed = false;
  @observable atf = false;
  @observable dsgOilAndFilter = false;
  @observable naturalGasTankAndPipelines = false;
  @observable haldexCouplingOil = false;
  @observable fuelFilter = false;
  @observable airFilter = false;
  @observable tirePressureSensors = false;
  @observable tireFillerBottle = false;
  @observable dustAndPollenFilter = false;
  @observable toothedBelt = false;
  @observable sparkPlugs = false;
}