import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import RemoveModal from '../common/RemoveModal';
import RemoveButton from '../common/RemoveButton';
import EditButton from '../common/EditButton';
import Pagination from '../filter/Pagination';

class AdditionalEquipmentList extends Component {
  state = {
    isModalOpen: false,
    id: null,
    name: ''
  }

  showModal = (element) => {
    this.setState({ isModalOpen: true, id: element.id, name: element.name });
  }

  handleRemove = async () => {
    const { id } = this.state;
    await this.props.onRemoveAdditionalEquipment(id);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({ isModalOpen: false, id: null, name: '' });
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
            ))
          }
        </td>
        <td>
          <RemoveButton onClick={() => this.showModal(equipment)} />
          <EditButton onClick={() => this.props.onSelect(equipment.id, this.props.history)} />
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
        <Pagination
          itemsCount={this.props.paging.totalItems}
          pageSize={this.props.paging.pageSize}
          currentPage={this.props.paging.currentPage}
          onPageChange={this.props.onPageChange}
        />
        <RemoveModal
          isOpen={this.state.isModalOpen}
          title={`Remove ${this.state.name} ?`}
          handleCancel={this.handleCancel}
          handleRemove={this.handleRemove}
          info="This action is irreversible, continue with cautious."
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