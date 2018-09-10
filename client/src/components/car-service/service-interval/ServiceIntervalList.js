import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import RemoveModal from '../../common/RemoveModal';
import RemoveButton from '../../common/RemoveButton';
import EditButton from '../../common/EditButton';
import Pagination from '../../filter/Pagination';

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
    await this.props.onRemoveServiceInterval(id);
    this.handleCancel();
  }

  handleCancel = () => {
    this.setState({ isOpen: false, id: null, name: '' });
  }

  render() {
    const { pathname } = this.props.location;
    const renderList = _.map(this.props.intervals, interval => (

      <div key={interval.id}
        className="row bg-light border-bottom border-secondary text-dark p-1">
        <span className="col-md-3 text-center">{interval.maximumMileage}</span>
        {
          !_.isEmpty(interval.vehicleModel)
            ? <span className="col-md-3 text-center">{interval.vehicleModel.name} - {interval.vehicleModel.year}</span>
            : <span className="col-md-3 text-center"></span>
        }
        {
          !_.isEmpty(interval.serviceType)
            ? <span className="col-md-3 text-center">({interval.serviceType.name})</span>
            : <span className="col-md-3 text-center"></span>
        }
        <span className="col-md-3 text-center">
          <RemoveButton onClick={() => this.showModal(interval)} />
          <EditButton onClick={() => this.props.history.push(`${pathname}/${interval.id}`)} />
        </span>
        <hr />
      </div>)
    )
    return (
      <div>
        <div className="row bg-dark border-bottom border-danger text-light pb-1">
          <span className="col-md-3 text-center">Mileage</span>
          <span className="col-md-3 text-center">Vehicle model</span>
          <span className="col-md-3 text-center">Service type</span>
          <span className="col-md-3 text-center"></span>
        </div>
        {renderList}
        <Pagination
          itemsCount={this.props.paging.totalItems}
          pageSize={this.props.paging.pageSize}
          currentPage={this.props.paging.currentPage}
          onPageChange={this.props.onPageChange}
        />
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