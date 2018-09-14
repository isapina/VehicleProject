import { observable, action } from 'mobx';

class PaginationStore {
  @observable currentPage = 1;
  @observable pageSize = 5;

  @action
  onPageChange = (page) => {
    this.currentPage = page;
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