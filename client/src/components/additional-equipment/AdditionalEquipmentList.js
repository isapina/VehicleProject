import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import RemoveModal from '../common/RemoveModal';
import AdditionalEquipmentListItem from './AdditionalEquipmentListItem';

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
    this.setState({ isModalOpen: false });
    await this.props.onRemoveAdditionalEquipment(id);
  }

  handleCancel = () => {
    this.setState({ isModalOpen: false, id: null, name: '' });
  }

  render() {
    const show = _.map(this.props.equipments, equipment => (
      <AdditionalEquipmentListItem
        key={equipment.id}
        equipment={equipment}
        history={this.props.history}
        onSelect={this.props.onSelect}
        showModal={this.showModal} />
    ));

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