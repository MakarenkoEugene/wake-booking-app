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
  selectedVersion = this.data?.demos?.[0];
  state = this.data?.state;
  userDevice = '';
  isOpen = true;
  showModal = false;

  constructor(rootStore) {
    this.rootStore = rootStore;

    this.changeIsOpen = this.changeIsOpen.bind(this);
    this.reloard = this.reloard.bind(this);
    this.setState = this.setState.bind(this);

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
  }

  setUserDevice(device) {
    this.userDevice = device;
  }

  changeIsOpen() {
    this.isOpen = !this.isOpen;
  }

  selectVersion(version) {
    this.selectedVersion = version;
    this.isOpen = true;
  }

  reloard() {
    this.selectedVersion(null);
  }
}
