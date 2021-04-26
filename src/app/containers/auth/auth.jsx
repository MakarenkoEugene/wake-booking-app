import React, { useState, useEffect } from 'react';
import { inject } from 'mobx-react';
import { Grid, Paper, Tabs, Tab } from '@material-ui/core';
// import { Input, Button } from '@components/ui';
import { formValidate } from '@utils';
import { useHistory } from 'react-router-dom';
import Login from './login';
import Register from './register';
import useStyles from './auth.styles';

const validate = formValidate({
  phone: (v) => v && v.trim().length > 10,
  password: (v) => v && v.trim().length > 2,
});

const paths = [
  { path: 'login', Component: Login },
  { path: 'register', Component: Register },
  { path: 'restore', Component: () => null },
];

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(
    paths.findIndex(({ path }) => history.location.pathname.endsWith(path)) || 0,
  );

  validate();

  useEffect(() => {
    history.push({ pathname: `/auth/${paths[activeTab].path}`, search: window.location.search });
  }, [activeTab]);

  const { Component } = paths[activeTab];

  return (
    <Grid container justify='center' alignItems='center'>
      <Paper className={classes.auth} elevation={3}>
        <Tabs
          indicatorColor='primary'
          textColor='primary'
          value={activeTab}
          variant='scrollable'
          scrollButtons='on'
          onChange={(e, v) => setActiveTab(v)}
        >
          <Tab label='Login' />
          <Tab label='Register' />
          <Tab label='Restore' />
        </Tabs>

        <Component />
      </Paper>
    </Grid>
  );
};

export default inject('rootStore')(Auth);
