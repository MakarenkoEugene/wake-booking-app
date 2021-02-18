import { http } from '@libs/http';
import { makeAutoObservable } from 'mobx';

export default class CreativesStore {
  creatives = null;

  constructor() {
    // this.hideModal = this.hideModal.bind(this);

    makeAutoObservable(this);
  }

  async get(id) {
    console.log(id);
    const res = await http.get(`creatives/${id}`);
    console.dir(res);

    this.creatives = res;
  }
}
