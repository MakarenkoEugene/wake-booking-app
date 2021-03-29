import { makeAutoObservable } from 'mobx';

export default class UIStore {
  modal = { isOpen: false };
  alert = {};

  constructor() {
    this.hideModal = this.hideModal.bind(this);

    makeAutoObservable(this);
  }

  showModal(data) {
    this.modal = {
      ...data,
      isOpen: true,
    };

    this.onModalClose = data.onClose;
    this.onAnyClose = data.onAnyClose;
  }

  hideModal(value) {
    this.modal.isOpen = false;

    if (this.onAnyClose) {
      this.onAnyClose();
    }

    if (value && this.onModalClose) {
      this.onModalClose();
    }
  }

  showAlert(data) {
    this.alert = {
      ...data,
      isOpen: true,
    };

    if (data.delay) {
      setTimeout(() => this.hideAlert(), data.delay);
    }
  }

  hideAlert() {
    this.alert.isOpen = false;
  }
}
