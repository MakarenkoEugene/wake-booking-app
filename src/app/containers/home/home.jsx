import React from 'react';
import { useLocation } from 'react-router-dom';
import { inject } from 'mobx-react';
import { Grid, Typography } from '@material-ui/core';

const Home = ({ rootStore: { ui } }) => {
  const q = new URLSearchParams(useLocation().search);

  if (q.has('error')) {
    ui.showAlert({
      type: 'error',
      msg: 'Komodo does not allow you to use this system :(',
      delay: 6000,
    });
  }

  return (
    <Grid container justify='center'>
      <Typography variant='h3'>Welcome to Komodo (admin panel)</Typography>

      <img style={{ borderRadius: 10, marginTop: 20 }} src={`${process.env.PUBLIC_PATH}/assets/img/komodo.png`} />
    </Grid>
  );
};

export default inject('rootStore')(Home);
