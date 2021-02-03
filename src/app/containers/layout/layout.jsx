import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { Alert, Modal } from '@components/ui';

const Layout = ({ rootStore: { uiStore }, children }) => (
  <Grid container direction='row' justify='center' alignItems='center'>
    {children}

    {uiStore.alert.isOpen && <Alert severity={uiStore.alert.type}>{uiStore.alert.msg}</Alert>}

    <Modal {...uiStore.modal} onClose={uiStore.hideModal} />
  </Grid>
);

export default inject('rootStore')(observer(Layout));
