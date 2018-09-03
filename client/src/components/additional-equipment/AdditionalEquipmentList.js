import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class AdditionalEquipmentList extends Component {
  render() {
    const show = _.map(this.props.equipments, equipment => (
      <tr
        key={equipment.id}>
        <td>{equipment.name}</td>
        <td style={{ maxWidth: '700px' }}>{equipment.description}</td>
        <td>
          {
            _.map(equipment.equipmentAttributes, attr => (
              <div key={attr.id}>
                <span>{attr.name}</span>
              </div>
            )
            )
          }
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
            <th style={{ maxWidth: '700px' }}>Description</th>
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
  onRemoveAdditionalEquipment: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default withRouter(AdditionalEquipmentList);