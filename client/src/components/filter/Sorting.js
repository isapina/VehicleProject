import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';

import SelectListGroup from '../common/SelectListGroup';

@inject('store')
@observer
class Sorting extends Component {
  componentWillUnmount() {
    this.props.store.sorting.clear();
  }

  render() {
    const { onChange, orderBy, ascending } = this.props.store.sorting;

    const ascendings = [{ label: 'Ascending', value: true }, { label: 'Descending', value: false }];
    return (
      <div className="d-flex inline-flex border w-50 p-1">
        <p className="text-muted form-text">Order by</p>
        <SelectListGroup name="orderBy" options={this.props.sortingOptions} onChange={onChange} value={orderBy} />
        <SelectListGroup name="ascending" options={ascendings} onChange={onChange} value={ascending} />
      </div>
    );
  }
};

Sorting.propTypes = {
  sortingOptions: PropTypes.array.isRequired
}

export default Sorting;