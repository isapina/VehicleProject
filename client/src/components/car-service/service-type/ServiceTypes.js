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
import Pagination from '../../filter/Pagination';
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
    this.props.store.pagination.onPageChange(page);
    const { embedsCSV } = this.props.store.embeds;
    const { orderBy, ascending } = this.props.store.sorting;
    const { searchTerm } = this.props.store.search;
    const { currentPage, pageSize } = this.props.store.pagination;
    this.props.store.serviceType.find(searchTerm, embedsCSV, { orderBy, ascending }, { currentPage, pageSize });
  }

  render() {
    const { embedsCSV } = this.props.store.embeds;
    const { orderBy, ascending } = this.props.store.sorting;
    const { searchTerm } = this.props.store.search;
    const { currentPage, pageSize, setPageSize } = this.props.store.pagination;

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
        />)
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
            value={pageSize}
            onChange={setPageSize}
            options={pages}
            info="Select how many items you want to be displayed per page" />
        </div >
      )
      : '';

    const pagination = serviceTypes !== null && serviceTypes.length > 0
      ? <Pagination
        totalPages={paging.totalPages}
        currentPage={paging.currentPage}
        onPageChange={this.onPageChange}
      />
      : '';

    return (
      <div>
        <div className="row m-1">
          <GoBackLink to="/car-service" />
          <h3 className="col-sm-10"> Service-type</h3>
        </div>
        <SearchBox
          placeholder="Search by Name..."
          onSearch={() => find(searchTerm, embedsCSV, { orderBy, ascending }, { currentPage, pageSize })} />
        <ToggleButton onClick={this.toggleFilters} value={this.state.toggleFilters} whenOnInfo="Hide filters" whenOffInfo="Show filters" />
        {filters}
        {pagination}
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