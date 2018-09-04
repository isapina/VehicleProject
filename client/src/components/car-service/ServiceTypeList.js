import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RemoveModal from '../common/RemoveModal';

class ServiceTypeList extends Component {
  state = {
    isOpen: false,
    id: null,
    name: ''
  }

  showModal = (element) => {
    this.setState({ isOpen: true, id: element.id, name: element.name });
  }

  handleRemove = async () => {
    const { id } = this.state;
    await this.props.onRemoveServiceType(id);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({ isOpen: false, id: null, name: '' });
  }

  render() {
    const renderList = _.map(this.props.serviceTypes, serviceType => (
      <tr key={serviceType.id}>
        <td>{serviceType.name}</td>
        <td><input type="checkbox" defaultChecked={serviceType.airFilter} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.atf} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.brakeFluidChanged} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.dsgOilAndFilter} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.dustAndPollenFilter} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.fuelFilter} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.haldexCouplingOil} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.inspectionService} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.intervalService} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.longLifeOilUsed} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.naturalGasTankAndPipelines} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.oilChangeService} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.sparkPlugs} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.tireFillerBottle} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.tirePressureSensors} /></td>
        <td><input type="checkbox" defaultChecked={serviceType.toothedBelt} /></td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.showModal(serviceType)}
          > Remove
        </button>
          <button
            type="button"
            className="btn btn-outline-info btn-sm ml-2"
            onClick={() => this.props.onSelect(serviceType.id, this.props.history)}
          > Edit
        </button>
        </td>
      </tr>
    ));

    return (
      <Fragment>
        <table className="table mt-3">
          <thead className="thead-dark">
            <tr>
              <th style={{ minWidth: '120px' }}>Name</th>
              <th>Air filter</th>
              <th>Atf</th>
              <th>Brake fluid changed</th>
              <th>Dsg oil and filter</th>
              <th>Dust and pollen filter</th>
              <th>Fuel filter</th>
              <th>Haldex coupling oil</th>
              <th>Inspection service</th>
              <th>Interval service</th>
              <th>Long life oil used</th>
              <th>Natural gas tank and pipelines</th>
              <th>Oil change service</th>
              <th>Spark plugs</th>
              <th>Tire filler bottle</th>
              <th>Tire pressure sensors</th>
              <th>Toothed belt</th>
              <th style={{ minWidth: '145px' }}></th>
            </tr>
            {renderList}
          </thead>
        </table>
        <RemoveModal
          isOpen={this.state.isOpen}
          title={`Remove ' ${this.state.name} ' ?`}
          handleCancel={this.handleCancel}
          handleRemove={this.handleRemove}
          info="This action is irrevertable, continue with cautious."
        />
      </Fragment>
    );
  }


};

ServiceTypeList.propTypes = {
  serviceTypes: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemoveServiceType: PropTypes.func.isRequired
};

export default withRouter(ServiceTypeList);