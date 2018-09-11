import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import EquipmentAttributeListItem from './EquipmentAttributeListItem';

const EquipmentAttributeList = (props) => {
  const attributes = _.map(props.attributes, attribute => (
    <EquipmentAttributeListItem attribute={attribute} removeFromList={props.removeFromList} />
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>
          </th>
        </tr>
        {attributes}
      </thead>
    </table>
  );
};

EquipmentAttributeList.propTypes = {
  attributes: PropTypes.array.isRequired,
  removeFromList: PropTypes.func.isRequired
};

export default EquipmentAttributeList;