import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Step, StepLabel } from '@material-ui/core';
import MuiStepper from '@material-ui/core/Stepper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export function Stepper({ steps, activeStep }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiStepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </div>
  );
}
