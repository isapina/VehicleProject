import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import ServiceTypeList from './ServiceTypeList';

@inject('store')
@observer
class CarServices extends Component {
  componentDidMount() {
    this.props.store.serviceType.refreshStateToInitialValue();
  }

  loadServiceTypes = async () => {
    await this.props.store.serviceType.find();
  }

  render() {
    const { pathname } = this.props.location;
    const { serviceTypes, onSelect, onRemoveServiceType } = this.props.store.serviceType;
    const renderServiceTypeList = serviceTypes.length > 0 ? <ServiceTypeList serviceTypes={serviceTypes} onSelect={onSelect} onRemoveServiceType={onRemoveServiceType} /> : '';

    return (
      <div>
        CarService
        <hr />
        <Link
          to={`${pathname}/add`}
          className="btn btn-info  d-inline mr-4"
        >Add service type</Link>
        <button type="button" className="btn btn-secondary btn-sm" onClick={this.loadServiceTypes}>Show service types</button>
        <hr />
        {renderServiceTypeList}
      </div>
    );
  }
};

export default CarServices;