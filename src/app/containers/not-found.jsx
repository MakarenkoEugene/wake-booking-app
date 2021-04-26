import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';

const NotFound = () => (
  <Grid container justify='center' alignItems='center' direction='row' style={{ paddingTop: '4em' }}>
    <Typography
      variant='h2'
      color='textPrimary'
      style={{ paddingRight: '0.5em', borderRight: '1px solid black', marginRight: '0.5em' }}
    >
      404
    </Typography>

    <Box>
      <Typography variant='h3' color='textPrimary'>Not Found</Typography>
      <Typography variant='subtitle1' color='textPrimary'>This is not the web page you are looking for.</Typography>
    </Box>
  </Grid>
);

export default NotFound;
