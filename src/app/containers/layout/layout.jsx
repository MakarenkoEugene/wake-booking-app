import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { Alert, Modal } from '@components/ui';
import { Notifier } from '@components';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './components/header/header';
import useStyles from './layout.styles';

const LayoutAdmin = ({ rootStore: { ui }, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.layout}>
      <Header classes={classes} />

      <div className={classes.toolbar} />

      <Grid
        container
        direction='row'
        justify='flex-start'
        wrap='nowrap'
        className={classes.main}
      >
        <div style={{ display: 'inline-table' }} className={ui.drawerOpen ? classes.drawerOpen : classes.drawerClose} />
        <main style={{ flexGrow: 1, position: 'relative', width: `calc(100% - ${ui.drawerOpen ? 240 : 64}px)` }}>
          {children}
        </main>
      </Grid>

      {ui.alert.isOpen && <Alert severity={ui.alert.type}>{ui.alert.msg}</Alert>}

      <Modal {...ui.modal} onClose={ui.hideModal} />

      {/* LOADER */}
      <Backdrop className={classes.backdrop} open={Boolean(ui.loading.root || ui.loading.admin)}>
        <CircularProgress color='inherit' />
      </Backdrop>

      <Notifier />
    </div>
  );
};

export default inject('rootStore')(observer(LayoutAdmin));
