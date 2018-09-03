import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';

import SelectListGroup from '../common/SelectListGroup';

@inject('store')
@observer
class Sorting extends Component {
  render() {

    const ascendings = [{ label: 'Ascending', value: true }, { label: 'Descending', value: false }];
    const { onChange, orderBy, ascending } = this.props.store.filter;
    return (
      <div className="d-flex inline-flex">
        <p className="text-muted p-2 form-text">Order by</p>
        <SelectListGroup name="orderBy" options={this.props.sortingOptions} onChange={onChange} value={orderBy}/>
        <SelectListGroup name="ascending" options={ascendings} onChange={onChange} value={ascending} />
      </div>
    );
  }
};

Sorting.propTypes = {
  sortingOptions: PropTypes.array.isRequired
}

export default Sorting;