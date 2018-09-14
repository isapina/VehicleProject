import _ from "lodash";
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Pagination extends Component {
  componentWillUnmount() {
    this.props.store.pagination.clear();
  }

  render() {
    const { totalPages, currentPage } = this.props;

    if (totalPages === 1) return null;

    const pages = _.range(1, totalPages + 1);

    return (
      <nav>
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={page === currentPage ? "page-item active" : "page-item"}
            >
              <a className="page-link" onClick={() => this.props.onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
