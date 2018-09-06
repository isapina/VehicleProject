import _ from 'lodash';
import React from 'react';

const ServiceIntervalList = ({ intervals, onRemoveServiceInterval, onSelect }) => {
  const renderList = _.map(intervals, interval => <div key={interval.id}>
    <p>Mileage: {interval.maximumMileage}</p>
    <span>{interval.vehicleModel.name} - {interval.vehicleModel.year} - ({interval.serviceType.name})</span>
    <hr />
  </div>)
  return (
    <div>
      {renderList}
    </div>
  );
};

export default ServiceIntervalList;