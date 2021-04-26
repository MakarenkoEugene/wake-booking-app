import React, { useState } from 'react';
import { Grid } from '@material-ui/core'; // Typography, Paper, Tabs, Tab
import { Input, Button } from '@components/ui';
import { formValidate } from '@utils';
import useStyles from './auth.styles';

const validate = formValidate({
  phone: (v) => v && v.trim().length > 10,
  password: (v) => v && v.trim().length > 2,
});

const Login = ({ submit }) => {
  const classes = useStyles();
  const [state, setState] = useState({ phone: '', password: '' });
  const [valid, setValid] = useState({});

  const onChange = (field) => (value) => {
    const newState = { ...state, [field]: value };

    const newValid = validate(newState);

    setState(newState);
    setValid(newValid);
  };

  return (
    <form onSubmit={() => submit(state)}>
      <Grid className={classes.form} container direction='column' spacing={5}>
        <Grid item>
          <Input
            name='phone'
            id='input-phone'
            label='Phone number'
            value={state.phone}
            placeholder='Enter your phone number'
            onChange={onChange('phone')}
            required
          />
        </Grid>
        <Grid item>
          <Input
            name='password'
            id='input-password'
            label='Password'
            type='password'
            autoComplete='on'
            value={state.phone}
            placeholder='Enter your password'
            onChange={onChange('password')}
            required
          />
        </Grid>
        <Grid item>
          <Button
            disabled={Object.values(valid).some((fieldValid) => !fieldValid)}
            type='submit'
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
