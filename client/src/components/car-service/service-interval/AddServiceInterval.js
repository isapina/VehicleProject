import _ from 'lodash';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';

import TextFieldGroup from '../../common/TextFieldGroup';
import GoBackLink from '../../common/GoBackLink';
import SubmitButton from '../../common/SubmitButton';

const VEHICLE_MODEL_NAME = "E350 - 2008";
const VEHICLE_MODEL_ID = '0dd77ea8-386a-4ab7-a13c-40e8041eaa5c';

@inject('store')
@observer
class AddServiceInterval extends Component {
  async componentWillMount() {
    await this.props.store.serviceType.find();
    this.props.store.serviceInterval.refreshStateToInitialValue();
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.store.serviceInterval.saveServiceInterval(this.props.history);
  }

  render() {
    const { serviceInterval, onChange, errors, onCheck } = this.props.store.serviceInterval;
    const { serviceTypes } = this.props.store.serviceType;
    const serviceTypesMapped = _.map(serviceTypes, serviceType => {
      return _.pick(serviceType, ['id', 'name']);
    });
    const renderServiceTypes = _.map(serviceTypesMapped, serviceType => (
      <div className="custom-control custom-radio" key={serviceType.id}>
        <input type="radio" id={serviceType.id} name="serviceTypeRadios" className="custom-control-input" value={serviceInterval.serviceTypeId} onChange={onCheck} />
        <label className="custom-control-label" htmlFor={serviceType.id}>{serviceType.name}</label>
      </div>
    ));
    const err = !_.isEmpty(errors) && errors;
    return (
      <div>
        <GoBackLink to="/car-service-interval" />
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            type="number"
            min={0}
            max={300000}
            name="maximumMileage"
            placeholder="Maximum mileage"
            value={serviceInterval.maximumMileage}
            onChange={onChange}
            error={err.message || err.maximumMileage}
          />
          <div className="custom-control custom-checkbox  w-50  d-flex justify-content-start" >
            <input
              type="checkbox"
              className={classnames('custom-control-input', { 'is-invalid': err.vehicleModelId })}
              name="vehicleModelId"
              value={VEHICLE_MODEL_ID}
              checked={!!serviceInterval.vehicleModelId}
              onChange={onChange}
              id="vehicleModelId"
            />
            <label htmlFor="vehicleModelId" className="custom-control-label">
              {VEHICLE_MODEL_NAME}
            </label>
          </div>
          <div className={classnames('form-control form-control-lg', { 'is-invalid': err.serviceType })}>
            {renderServiceTypes}
          </div>
          {err && <div className="invalid-feedback">{err.serviceType || err.message}</div>}
          <SubmitButton />
        </form>
      </div>
    );
  }
};

export default AddServiceInterval;