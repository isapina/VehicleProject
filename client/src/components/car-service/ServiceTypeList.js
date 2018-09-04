import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ServiceTypeList = ({
  serviceTypes,
  onSelect,
  onRemoveServiceType,
  history
}) => {
  const renderList = _.map(serviceTypes, serviceType => (
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
          onClick={() => onRemoveServiceType(serviceType.id)}
        > Remove
      </button>
        <button
          type="button"
          className="btn btn-outline-info btn-sm ml-2"
          onClick={() => onSelect(serviceType.id, history)}
        > Edit
      </button>
      </td>
    </tr>
  ));

  return (
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
  );
};

ServiceTypeList.propTypes = {
  serviceTypes: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemoveServiceType: PropTypes.func.isRequired
};

export default withRouter(ServiceTypeList);