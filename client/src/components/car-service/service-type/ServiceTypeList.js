import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import ServiceTypeListItem from './ServiceTypeListItem';
import RemoveModal from '../../common/RemoveModal';
import PreviewServiceType from './PreviewServiceType';

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
    const renderList = _.map(this.props.serviceTypes, serviceType => (
      <ServiceTypeListItem history={this.props.history} serviceType={serviceType} showModal={this.showModal} showPreviewModal={this.showPreviewModal} />
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