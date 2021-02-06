import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { Alert, Modal } from '@components/ui';
import Header from './components/header/header';
import './layout.scss';

const Layout = ({ rootStore: { ui }, children }) => (
  <Grid container direction='row' justify='center' alignItems='center' alignContent='flex-start' className='layout'>
    <Header />

    {children}

    {ui.alert.isOpen && <Alert severity={ui.alert.type}>{ui.alert.msg}</Alert>}

    <Modal {...ui.modal} onClose={ui.hideModal} />
  </Grid>
);

export default inject('rootStore')(observer(Layout));
