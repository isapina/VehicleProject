import _ from 'lodash';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const EquipmentAttributeList = (props) => {
  const attributes = _.map(props.attributes, attribute => {
    return (
      <tr key={attribute.id}>
        <td>{attribute.name}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => props.removeFromList(attribute.id)}
          > Remove
          </button>
        </td>
      </tr>
    )
  }

  );

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