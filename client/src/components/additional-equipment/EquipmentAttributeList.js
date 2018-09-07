import _ from 'lodash';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RemoveButton from '../common/RemoveButton';

const EquipmentAttributeList = (props) => {
  const attributes = _.map(props.attributes, attribute => {
    return (
      <tr key={attribute.id}>
        <td>{attribute.name}</td>
        <td>
          <RemoveButton onClick={() => props.removeFromList(attribute.id)} />
        </td>
      </tr>
    )
  });

  return (
    <Fragment >
      <h6>Equipment attributes currently in list: {props.attributes.length}</h6>
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
    </Fragment>
  );
};

EquipmentAttributeList.propTypes = {
  attributes: PropTypes.array.isRequired,
  removeFromList: PropTypes.func.isRequired
};

export default EquipmentAttributeList;