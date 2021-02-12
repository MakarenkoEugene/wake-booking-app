import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const Home = () => (
  <Grid container justify='center'>
    <Typography variant='h3'>Welcome to Komodo (plwx admin panel)</Typography>

    <img style={{ borderRadius: 10, marginTop: 20 }} src={`${process.env.PUBLIC_PATH}/assets/img/komodo.png`} />
  </Grid>
);

export default Home;
