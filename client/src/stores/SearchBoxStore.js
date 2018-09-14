import { observable, action } from 'mobx';

class SearchBoxStore {
  @observable searchTerm = '';

  @action
  onChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  @action
  clear = () => {
    this.searchTerm = '';
  }
}

const searchBoxStore = new SearchBoxStore();

export default searchBoxStore;