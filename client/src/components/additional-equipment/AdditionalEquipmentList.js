import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class AdditionalEquipmentList extends Component {
  render() {
    const show = this.props.equipments.map(equipment => (
      <tr
        key={equipment.id}>
        <td>{equipment.name}</td>
        <td>{equipment.description}</td>
        <td>
          {equipment.equipmentAttributes.map(attr => <div key={attr.id}>
            <span>{attr.name}</span>
          </div>
          )}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.props.onRemoveAdditionalEquipment(equipment.id)}
          > Remove
          </button>
          <button
            type="button"
            className="btn btn-outline-info btn-sm ml-2"
            onClick={() => this.props.onSelect(equipment.id, this.props.history)}
          > Edit
          </button>
        </td>
      </tr>)
    )

    return (
      <table className="table mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Attributes</th>
            <th></th>
          </tr>
          {show}
        </thead>
      </table>
    );
  }

};

AdditionalEquipmentList.propTypes = {
  equipments: PropTypes.array.isRequired,
  onRemoveAdditionalEquipment: PropTypes.func.isRequired
}

export default withRouter(AdditionalEquipmentList);