import _ from 'lodash';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import AdditionalEquipmentList from './AdditionalEquipmentList';
import Spinner from '../common/Spinner';
import Sorting from '../filter/Sorting';
import additionalEquipmentSortingOptions from './additionalEquipmentSortingOptions';
import Embeds from '../filter/Embeds';
import additionalEquipmentEmbeds from './additionalEquipmentEmbeds';
import SearchBox from '../search-box/SearchBox';
import AddNewLink from '../common/AddNewLink';
import ToggleButton from '../common/ToggleButton';
import SelectListGroup from '../common/SelectListGroup';
import Pagination from '../filter/Pagination';
import { pages } from '../filter/pages';

@inject('store')
@observer
class AdditionalEquipments extends Component {
  state = {
    toggleFilters: true
  }

  componentWillMount() {
    this.props.store.equipment.refreshStateToInitialValue();
  }

  toggleFilters = () => {
    this.setState(prevState => ({ toggleFilters: !prevState.toggleFilters }))
  }

  onPageChange = (page, callback) => {
    this.props.store.pagination.onPageChange(page, callback);
  }

  find = () => {
    const { embedsCSV } = this.props.store.embeds;
    const { orderBy, ascending } = this.props.store.sorting;
    const { searchTerm } = this.props.store.search;
    const { currentPage, pageSize } = this.props.store.pagination;
    this.props.store.equipment.find(searchTerm, embedsCSV, { orderBy, ascending }, { currentPage, pageSize });
  }

  render() {
    const { pageSize, setPageSize } = this.props.store.pagination;

    const { equipment } = this.props.store;
    const paging = _.pick(equipment, ['currentPage', 'pageSize', 'totalItems', 'totalPages']);

    let renderList;
    if (equipment.loading) {
      renderList = <Spinner />
    }
    if (equipment.additionalEquipments === null) {
      renderList = '';
    }
    else if (equipment.additionalEquipments.length > 0) {
      renderList = (
        <AdditionalEquipmentList
          equipments={equipment.additionalEquipments}
          onRemoveAdditionalEquipment={equipment.onRemoveAdditionalEquipment}
          onSelect={equipment.onSelect}
        />)
    }

    const filters = !this.state.toggleFilters
      ? (
        <div>
          <div className="d-flex inline-flex">
            <Sorting sortingOptions={additionalEquipmentSortingOptions} />
            <Embeds embeds={additionalEquipmentEmbeds} />
          </div>
          <SelectListGroup
            name="pageSize"
            value={pageSize}
            onChange={setPageSize}
            options={pages}
            info="Select how many items you want to be displayed per page" />
        </div>
      )
      : '';

    const pagination = equipment.additionalEquipments !== null && equipment.additionalEquipments.length > 0
      ? <Pagination
        totalPages={paging.totalPages}
        currentPage={paging.currentPage}
        onPageChange={(page) => this.onPageChange(page, this.find)}
      />
      : '';

    return (
      <div>
        <h3 className="text-center"> Additional equipment</h3>
        <hr />
        <SearchBox
          placeholder="Search by Name or Description..."
          onSearch={this.find}
        />
        <ToggleButton onClick={this.toggleFilters} value={this.state.toggleFilters} whenOnInfo="Hide filters" whenOffInfo="Show filters" />
        {filters}
        {pagination}
        {renderList}
        <hr />
        <AddNewLink info="Add additional equipment" />
      </div>
    );
  }
};

export default AdditionalEquipments;