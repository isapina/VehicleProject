import { observable, action, computed } from 'mobx';
import axios from '../axios';

class SearchStore {
  @observable searchTerm = '';
  @observable embeds = '';
  @observable orderBy = 'id';
  @observable ascending = true;
  @observable results = [];
  @observable errors = {};

  @action
  search = async () => {
    // API call 
    try {
      const query = this.queryString;
      const res = await axios.get(`/some-api-route${query}`);
      this.results = res.data;
    } catch (error) {
      this.errors = error.response.data;
    }
  }

  @action
  onChange = (e) => {
    this[e.target.name] = e.target.value;
  }

  @computed
  get queryString() {
    return `?searchTerm=${this.searchTerm}&embeds=${this.embeds}&${this.ascending}&orderBy=${this.orderBy}`;
  }
}

const searchStore = new SearchStore();

export default searchStore;
