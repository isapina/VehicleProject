import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import RemoveModal from '../../common/RemoveModal';
import ServiceIntervalListItem from './ServiceIntervalListItem';

class ServiceIntervalList extends Component {
  state = {
    isOpen: false,
    id: null,
    name: '',
    isPreviewOpen: false,
    serviceType: {}
  }

  showModal = (element) => {
    this.setState({ isOpen: true, id: element.id, name: element.maximumMileage });
  }

  handleRemove = async () => {
    const { id } = this.state;
    this.setState({ isOpen: false });
    await this.props.onRemoveServiceInterval(id);
  }

  handleCancel = () => {
    this.setState({ isOpen: false, id: null, name: '' });
  }

  render() {
    const renderList = _.map(this.props.intervals, interval => (
      <ServiceIntervalListItem
        key={interval.id}
        history={this.props.history}
        interval={interval}
        showModal={this.showModal} />
    ));

    return (
      <div>
        <div className="row bg-dark border-bottom border-danger text-light pb-1">
          <span className="col-md-3 text-center">Mileage</span>
          <span className="col-md-3 text-center">Vehicle model</span>
          <span className="col-md-3 text-center">Service type</span>
          <span className="col-md-3 text-center"></span>
        </div>
        {renderList}
        <RemoveModal
          isOpen={this.state.isOpen}
          title={`Remove mileage - ${this.state.name}?`}
          handleCancel={this.handleCancel}
          handleRemove={this.handleRemove}
          info="This action is irreversible, continue with cautious."
        />
      </div>
    );
  }
};

export default withRouter(ServiceIntervalList);