import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import TextFieldGroup from '../../common/TextFieldGroup';
import ServiceTypeCheckbox from './ServiceTypeCheckbox';
import GoBackLink from '../../common/GoBackLink';
import SubmitButton from '../../common/SubmitButton';

@inject('store')
@observer
class AddServiceType extends Component {
  onSubmit = async (e) => {
    e.preventDefault();
    await this.props.store.serviceType.saveServiceType(this.props.history);
  }

  render() {
    const {
      serviceType,
      errors,
      onChange,
      onCheck
    } = this.props.store.serviceType;
    const err = !_.isEmpty(errors) && errors;

    return (
      <Fragment>
        <GoBackLink to="/car-service-type" />
        <form onSubmit={this.onSubmit}>
          <h4>Add Service Type</h4>
          <TextFieldGroup
            name="name"
            placeholder="Service type name"
            value={serviceType.name}
            onChange={onChange}
            error={err.message || err.name}
          />
          <div
            className="border form-inline w-100 p-2">
            <ServiceTypeCheckbox
              name="airFilter"
              label="Air filter"
              value={serviceType.airFilter}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="atf"
              label="Atf"
              value={serviceType.atf}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="brakeFluidChanged"
              label="Brake fluid changed"
              value={serviceType.brakeFluidChanged}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="dsgOilAndFilter"
              label="Dsg oil and filter"
              value={serviceType.dsgOilAndFilter}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="dustAndPollenFilter"
              label="Dust and pollen filter"
              value={serviceType.dustAndPollenFilter}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="fuelFilter"
              label="Fuel filter"
              value={serviceType.fuelFilter}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="haldexCouplingOil"
              label="Haldex coupling oil"
              value={serviceType.haldexCouplingOil}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="inspectionService"
              label="Inspection service"
              value={serviceType.inspectionService}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="intervalService"
              label="Interval service"
              value={serviceType.intervalService}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="longLifeOilUsed"
              label="Long life oil used"
              value={serviceType.longLifeOilUsed}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="naturalGasTankAndPipelines"
              label="Natural gas tank and pipelines"
              value={serviceType.naturalGasTankAndPipelines}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="oilChangeService"
              label="Oil change service"
              value={serviceType.oilChangeService}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="sparkPlugs"
              label="Spark plugs"
              value={serviceType.sparkPlugs}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="tireFillerBottle"
              label="Tire filler bottle"
              value={serviceType.tireFillerBottle}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="tirePressureSensors"
              label="Tire pressure sensors"
              value={serviceType.tirePressureSensors}
              onCheck={onCheck} />
            <ServiceTypeCheckbox
              name="toothedBelt"
              label="Toothed belt"
              value={serviceType.toothedBelt}
              onCheck={onCheck} />
          </div>
          {err.serviceCheckbox && <div className="invalid-feedback" style={{ display: 'block' }}>{err.serviceCheckbox}</div>}
          <SubmitButton />
        </form>
      </Fragment>
    );
  }
};

export default withRouter(AddServiceType);