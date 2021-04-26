import { makeAutoObservable } from 'mobx';

export default class UserStore {
  isLoggedIn = !!this.user;
  activeParkIndex = 0;
  parks = null;
  options = null;
  date = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.clientId = document?.cookie?.split(';').find((v) => v.trim().startsWith('clientId'))?.split('=').pop();

    makeAutoObservable(this);
  }

  get name() {
    return this.user.email.split('@')[0];
  }

  get activePark() {
    return this.parks[this.activeParkIndex];
  }

  async getParks() {
    this.rootStore.ui.setLoading('root', true);
    const res = await this.rootStore.ui.makeRequest('get', 'park');
    if (res) this.parks = res;

    const options = await this.rootStore.ui.makeRequest('get', 'options.json');

    this.options = options;

    this.rootStore.ui.setLoading('root', false);
  }

  setActiveParkIndex(index) {
    if (this.parks.length <= index) throw new Error('setActiveParkIndex: index is invalid');
    this.activeParkIndex = index;
  }

  setParks(parks) {
    this.parks = parks;
  }

  canView(page) {
    return this.isLoggedIn && (this.user.isSuperAdmin || this.user.roles[page]);
  }

  canEdit(page) {
    return this.isLoggedIn && (this.user.isSuperAdmin || !!this.user.roles[page]?.isEdit);
  }
}
