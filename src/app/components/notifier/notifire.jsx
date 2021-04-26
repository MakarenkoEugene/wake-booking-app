import { Component } from 'react';
import { withSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';

class Notifier extends Component {
  displayed = [];

  componentDidMount() {
    autorun(() => {
      const { enqueueSnackbar, rootStore } = this.props;
      const { ui } = rootStore;

      ui.notifications.forEach((notification) => {
        // Do nothing if snackbar is already displayed
        if (this.displayed.includes(notification.key)) return;
        // Display snackbar using notistack
        enqueueSnackbar(notification.message, notification.options);
        // Keep track of snackbars that we've displayed
        this.storeDisplayed(notification.key);
        // Dispatch action to remove snackbar from mobx store
        ui.removeSnackbar(notification.key);
      });
    });
  }

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  render() {
    return null;
  }
}

export default withSnackbar(
  inject('rootStore')(observer(Notifier)),
);
