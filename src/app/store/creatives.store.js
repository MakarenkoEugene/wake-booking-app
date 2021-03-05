import { makeAutoObservable } from 'mobx';

const getCreatives = () => {
  try {
    return JSON.parse(window.data) || null;
  } catch (error) {
    return null;
  }
};

export default class CreativesStore {
  data = getCreatives();

  query = {};

  isInfoState = true;

  loading = true;

  selectVersion = (this.data?.demos && this.data.demos[0]) || null;

  orientation = this.data?.defaultOrientation || 'portrait'; // landscape, portrait

  state = this.data.state;

  userDevice = '' // 'phone', ''

  isOpen = true

  showModal = false

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.changeOrientation = this.changeOrientation.bind(this);
    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.reloard = this.reloard.bind(this);

    makeAutoObservable(this);
  }

  setShowModal(showModal) {
    this.showModal = showModal;
  }

  setState(state) {
    this.state = state;
  }

  setIsInfoState(isInfoState) {
    this.isInfoState = isInfoState;
  }

  setQuery(query) {
    this.query = { ...this.query, ...query };
    // console.log(JSON.stringify(this.query));
  }

  setUserDevice(device) {
    this.userDevice = device;
  }

  changeIsOpen() {
    this.isOpen = !this.isOpen;
  }

  selectVersion(version) {
    this.selectVersion = version;
    this.isOpen = true;
  }

  changeOrientation() {
    this.orientation = this.orientation === 'portrait' ? 'landscape' : 'portrait';
  }

  reloard() {
    this.selectVersion(null);
  }
}
