import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import RemoveButton from '../../common/RemoveButton';
import EditButton from '../../common/EditButton';
import RemoveModal from '../../common/RemoveModal';
import PreviewServiceType from './PreviewServiceType';
import PreviewButton from '../../common/PreviewButton';

class ServiceTypeList extends Component {
  state = {
    isOpen: false,
    id: null,
    name: '',
    isPreviewOpen: false,
    serviceType: {}
  }

  showModal = (element) => {
    this.setState({ isOpen: true, id: element.id, name: element.name });
  }

  handleRemove = async () => {
    const { id } = this.state;
    await this.props.onRemoveServiceType(id);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({ isOpen: false, id: null, name: '' });
  }

  showPreviewModal = (element) => {
    this.setState({ isPreviewOpen: true, serviceType: element });
  }

  handlePreviewCancel = () => {
    this.setState({ isPreviewOpen: false, serviceType: {} });
  }

  render() {
    const { pathname } = this.props.location;
    const renderList = _.map(this.props.serviceTypes, serviceType => (
      <tr key={serviceType.id} className="d-flex justify-content-between">
        <td>{serviceType.name}</td>
        <td>
          <PreviewButton onClick={() => this.showPreviewModal(serviceType)} />
          <RemoveButton onClick={() => this.showModal(serviceType)} />
          <EditButton onClick={() => this.props.history.push(`${pathname}/${serviceType.id}`)} />
        </td>
      </tr>
    ));

    return (
      <div>
        <div className="row">
          <table className="table w-75 m-auto">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
              {renderList}
            </thead>
          </table>
          <RemoveModal
            isOpen={this.state.isOpen}
            title={`Remove ${this.state.name}?`}
            handleCancel={this.handleCancel}
            handleRemove={this.handleRemove}
            info="This action is irreversible, continue with cautious."
          />
          <PreviewServiceType
            isOpen={this.state.isPreviewOpen}
            handleCancel={this.handlePreviewCancel}
            serviceType={this.state.serviceType}
          />
        </div>
      </div>
    );
  }
};

ServiceTypeList.propTypes = {
  serviceTypes: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemoveServiceType: PropTypes.func.isRequired
};

export default withRouter(ServiceTypeList);