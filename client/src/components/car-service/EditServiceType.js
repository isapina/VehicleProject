import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import ServiceTypeCheckbox from './ServiceTypeCheckbox';

@inject('store')
@observer
class EditServiceType extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.store.serviceType.findOne(id);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    await this.props.store.serviceType.updateServiceType(id)
    this.props.history.push('/car-service-type');
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
        <Link
          to="/car-service-type"
          className="btn btn-light mb-4"
        >
          <i className="fas fa-chevron-left"></i> Go back
        </Link>
        <form onSubmit={this.onSubmit}>
          <h4>Add Service Type</h4>
          <TextFieldGroup
            name="name"
            placeholder="Service type name"
            value={serviceType.name}
            onChange={onChange}
            error={err.message || err.name}
          />
          <div className="border form-inline w-100 p-2">
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
          <input type="submit" className="btn btn-primary btn-block mt-4" value="Submit" />
        </form>
      </Fragment>
    );
  }
};

export default withRouter(EditServiceType);