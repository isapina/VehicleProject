import _ from 'lodash';
import { observable, action } from 'mobx';

class SortingStore {
  @observable orderBy = '';
  @observable ascending = true;

  @action
  onChange = (e) => {
    this[e.target.name] = e.target.value;
  }
}

const sortingStore = new SortingStore();

export default sortingStore;
