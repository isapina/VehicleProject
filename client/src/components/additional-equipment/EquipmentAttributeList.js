import React, { Fragment } from 'react';

const EquipmentAttributeList = (props) => {
  const attributes = props.attributes.map(attribute => (
    <tr key={attribute.key}>
      <td>{attribute.name}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => props.removeFromList(attribute.key)}
        >
          Remove
      </button>
      </td>
    </tr>
  ));

  return (
    <Fragment >
      <h6>Equipment attributes currently in list</h6>
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

export default EquipmentAttributeList;