import { observable, action } from 'mobx';

class SortingStore {
  @observable orderBy = '';
  @observable ascending = true;

  @action
  onChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  @action
  clear = () => {
    this.orderBy = '';
    this.ascending = true;
  }
}

const sortingStore = new SortingStore();

export default sortingStore;
