import _ from 'lodash';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Sorting from '../../filter/Sorting';
import Embeds from '../../filter/Embeds';
import SearchBox from '../../search-box/SearchBox';
import serviceTypeEmbeds from './serviceTypeEmbeds';
import serviceTypeSortingOptions from './serviceTypeSortingOptions';
import ServiceTypeList from './ServiceTypeList';
import GoBackLink from '../../common/GoBackLink';
import AddNewLink from '../../common/AddNewLink';
import ToggleButton from '../../common/ToggleButton';
import SelectListGroup from '../../common/SelectListGroup';
import { pages } from '../../filter/pages';

@inject('store')
@observer
class ServiceTypes extends Component {
  state = {
    toggleFilters: true
  }

  componentDidMount() {
    this.props.store.serviceType.refreshStateToInitialValue();
  }

  loadServiceTypes = async () => {
    await this.props.store.serviceType.find();
  }

  toggleFilters = () => {
    this.setState(prevState => ({ toggleFilters: !prevState.toggleFilters }))
  }

  onPageChange = (page) => {
    const query = this.props.store.filter.filter.queryString;
    this.props.store.serviceType.onPageChange(page, query);
  }

  render() {
    const { serviceTypes, onSelect, onRemoveServiceType, find } = this.props.store.serviceType;
    const { serviceType } = this.props.store;
    const paging = _.pick(serviceType, ['currentPage', 'pageSize', 'totalItems', 'totalPages']);

    let renderList;
    if (serviceTypes === null) {
      renderList = '';
    }
    else if (serviceTypes.length > 0) {
      renderList = (
        <ServiceTypeList
          serviceTypes={serviceTypes}
          onSelect={onSelect}
          onRemoveServiceType={onRemoveServiceType}
          onPageChange={this.onPageChange}
          paging={paging}
        />)
    }
    else {
      renderList = <p>Sorry, we couldn't find any result(s) matching.</p>
    }

    const filters = !this.state.toggleFilters
      ? (
        <div>
          <div className="d-flex inline-flex">
            <Sorting sortingOptions={serviceTypeSortingOptions} />
            <Embeds embeds={serviceTypeEmbeds} />
          </div>
          <SelectListGroup
            name="pageSize"
            value={serviceType.pageSize}
            onChange={serviceType.onNumberValueChange}
            options={pages}
            info="Select how many items you want to be displayed per page" />
        </div >
      )
      : '';

    return (
      <div>
        <div className="row m-1">
          <GoBackLink to="/car-service" />
          <h3 className="col-sm-10"> Service-type</h3>
        </div>
        <SearchBox placeholder="Search by Name..." onSearch={find} />
        <ToggleButton onClick={this.toggleFilters} value={this.state.toggleFilters} whenOnInfo="Hide filters" whenOffInfo="Show filters" />
        {filters}
        {renderList}
        <hr />
        <div className="row">
          <AddNewLink info="Add service type" />
        </div>
      </div>
    );
  }
};

export default ServiceTypes;