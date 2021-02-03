import React from 'react';
import MatButton from '@material-ui/core/Button';

export const Button = (props) => (
  <MatButton
    variant={props.variant || 'contained'}
    color={props.color || 'primary'}
    {...props}
  />
);
