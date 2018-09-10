import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store')
@observer
class SearchBox extends Component {
  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onSearch(this.props.store.filter.filter.queryString);
    }
  }

  render() {
    const { filter, onChange } = this.props.store.filter;
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={this.props.placeholder}
          value={filter.searchTerm}
          name="searchTerm"
          onChange={onChange}
          onKeyPress={this.handleKeyPress}
        />
        <div >
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => this.props.onSearch(filter.queryString)}
          >Search...</button>
        </div>
      </div>
    );
  }
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default SearchBox;