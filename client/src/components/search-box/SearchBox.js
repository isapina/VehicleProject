import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store')
@observer
class SearchBox extends Component {
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.store.equipment.find(this.props.store.filter.queryString);
    }
  }

  render() {
    const { equipment, filter } = this.props.store;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={filter.searchTerm}
          name="searchTerm"
          onChange={filter.onChange}
          onKeyPress={this.handleKeyPress}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => equipment.find(filter.queryString)}
          >Search...</button>
        </div>
      </div>
    );
  }
};

SearchBox.propTypes = {
  placeholder: PropTypes.string
}

export default SearchBox;