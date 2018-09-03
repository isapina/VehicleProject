import { observable, action, computed } from 'mobx';

class FilterStore {
  @observable searchTerm = '';
  @observable embeds = '';
  @observable orderBy = '';
  @observable ascending = true;
  @observable pageNumber = null;
  @observable pageSize = null;

  @action
  onChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  @computed
  get queryString() {
    return `?searchTerm=${this.searchTerm}&embeds=${this.embeds}&ascending=${this.ascending}&orderBy=${this.orderBy}&pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
  }
}

const filterStore = new FilterStore();

export default filterStore;
