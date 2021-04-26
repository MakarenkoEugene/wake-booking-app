import { makeAutoObservable } from 'mobx';
import { http } from '@libs';
import { isValidStatus } from '@utils';

export default class UIStore {
  modal = { isOpen: false };
  alert = [];
  title = '';
  drawerOpen = false;
  notifications = [];
  loading = {
    root: false,
  };

  constructor() {
    this.hideModal = this.hideModal.bind(this);
    this.enqueueSnackbar = this.enqueueSnackbar.bind(this);
    this.removeSnackbar = this.removeSnackbar.bind(this);

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

  async makeRequest(method, url, data) {
    try {
      const [response, status] = await http[method](url, data);
      if (isValidStatus(status)) return response;

      if (response.message?.map) {
        response.message.forEach((message) => this.enqueueSnackbar({
          message,
          options: { variant: 'error' },
        }));
      } else {
        this.enqueueSnackbar({ message: response.message || response, options: { variant: 'error' } });
      }

      return false;
    } catch (error) {
      console.log(error);
      this.enqueueSnackbar({
        message: `${method.toUpperCase()} | ${error.message || error}`,
        options: { variant: 'error' },
      });

      return false;
    }
  }

  setLoading(key, loading) {
    this.loading[key] = loading;
  }

  setDrawerOpen(open) {
    this.drawerOpen = Boolean(open);
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

  setAlert(alert, replace) {
    if (replace) {
      this.alert = alert;
    } else {
      this.alert = [...this.alert, alert];
    }
  }

  enqueueSnackbar(note) {
    this.notifications.push({
      key: new Date().getTime() + Math.random(),
      ...note,
    });
  }

  removeSnackbar(key) {
    this.notifications = this.notifications.filter((notification) => notification.key !== key);
  }

  setTitle(title) {
    this.title = title;
  }

  hideAlert() {
    this.alert.isOpen = false;
  }
}
