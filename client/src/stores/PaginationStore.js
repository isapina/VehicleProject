import { observable, action } from 'mobx';

class PaginationStore {
  @observable currentPage = 1;
  @observable pageSize = 2;

  @action
  onPageChange = (page, callback) => {
    this.currentPage = page;
    callback();
  }

  @action
  setPageSize = (e) => {
    this.pageSize = parseInt(e.target.value, 10);
  }

  @action
  clear = () => {
    this.currentPage = 1;
    this.pageSize = 5;
  }
}

const paginationStore = new PaginationStore();

export default paginationStore;