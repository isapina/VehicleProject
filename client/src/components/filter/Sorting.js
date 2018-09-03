import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import SelectListGroup from '../common/SelectListGroup';

@inject('store')
@observer
class Sorting extends Component {
  render() {
    const options = [{ label: 'Id', value: 'id' }, { label: 'Name', value: 'name' }];
    const ascendings = [{ label: 'Ascending', value: true }, { label: 'Descending', value: false }];
    const { onChange, orderBy, ascending } = this.props.store.filter;
    return (
      <div className="d-flex inline-flex">
        <p className="text-muted p-2">Order by</p>
        <SelectListGroup name="orderBy" options={options} onChange={onChange} value={orderBy} />
        <SelectListGroup name="ascending" options={ascendings} onChange={onChange} value={ascending} />
      </div>
    );
  }
};

export default Sorting;