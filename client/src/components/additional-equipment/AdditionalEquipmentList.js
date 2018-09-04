import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import RemoveModal from '../common/RemoveModal';


class AdditionalEquipmentList extends Component {
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
    await this.props.onRemoveAdditionalEquipment(id);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({ isOpen: false, id: null, name: '' });
  }

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
            onClick={() => this.showModal(equipment)}
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
      <Fragment>
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

AdditionalEquipmentList.propTypes = {
  equipments: PropTypes.array.isRequired,
  onRemoveAdditionalEquipment: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default withRouter(AdditionalEquipmentList);