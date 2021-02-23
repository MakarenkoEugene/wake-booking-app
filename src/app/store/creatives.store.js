import { http } from '@libs/http';
import { makeAutoObservable } from 'mobx';

export default class CreativesStore {
  data = {};

  loading = true;

  selectVersion = {};

  orientation = 'portrait' // landscape, portrait

  userDevice = '' // 'phone', ''

  isOpen = true

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.onChangeOrientation = this.onChangeOrientation.bind(this);
    this.onChangeIsOpen = this.onChangeIsOpen.bind(this);
    this.reloard = this.reloard.bind(this);

    makeAutoObservable(this);
  }

  async get(id) {
    try {
      const res = await http.get(`creatives/${id}`);

      this.data = res;

      this.orientation = this.data?.defaultOrientation || 'portrait';
      this.onSelectVersion(this.data?.demos[0] || null);
    } catch (error) {
      this.data = null;
    }

    this.loading = false;
  }

  setUserDevice(device) {
    this.userDevice = device;
  }

  onChangeIsOpen() {
    this.isOpen = !this.isOpen;
  }

  onSelectVersion(version) {
    this.selectVersion = version;
    this.isOpen = true;
  }

  onChangeOrientation() {
    this.orientation = this.orientation === 'portrait' ? 'landscape' : 'portrait';
  }

  reloard() {
    this.onSelectVersion(null);
  }
}
