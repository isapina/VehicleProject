import _ from 'lodash';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';

import TextFieldGroup from '../../common/TextFieldGroup';
import GoBackLink from '../../common/GoBackLink';
import SubmitButton from '../../common/SubmitButton';

@inject('store')
@observer
class EditServiceInterval extends Component {
  id = this.props.match.params.id;

  async componentWillMount() {
    await this.props.store.serviceType.find();
    await this.props.store.serviceInterval.findOne(this.id, 'servicetype');
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.props.store.serviceInterval.updateServiceInterval(this.id, this.props.history);
  }

  render() {
    const { serviceInterval, onChange, errors, onCheck } = this.props.store.serviceInterval;
    const { serviceTypes } = this.props.store.serviceType;
    const serviceTypesMapped = _.map(serviceTypes, serviceType => {
      return _.pick(serviceType, ['id', 'name']);
    });
    const renderServiceTypes = _.map(serviceTypesMapped, serviceType => {
      const checked = serviceType.id === serviceInterval.serviceTypeId;
      return (
        <div className="custom-control custom-radio" key={serviceType.id}>
          <input type="radio" id={serviceType.id} name="serviceTypeRadios" className="custom-control-input" value={serviceInterval.serviceTypeId} onChange={onCheck}
            checked={checked} />
          <label className="custom-control-label" htmlFor={serviceType.id}>{serviceType.name}</label>
        </div>
      )
    });
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
              value={serviceInterval.vehicleModelId}
              checked={!!serviceInterval.vehicleModelId}
              onChange={onChange}
              id="vehicleModelId"
            />
            <label htmlFor="vehicleModelId" className="custom-control-label">
              E350 - 2008
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

export default EditServiceInterval;