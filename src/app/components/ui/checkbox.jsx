import React from 'react';
import { FormControlLabel, Checkbox as MatCheckbox } from '@material-ui/core';

export function Checkbox({ label, ...props }) {
  const onChange = (e) => props.onChange(e.target.checked);

  const CheckboxComponent = <MatCheckbox {...props} onChange={onChange} color='primary' />;

  if (label) {
    return (
      <FormControlLabel
        control={CheckboxComponent}
        label={label}
      />
    );
  }

  return CheckboxComponent;
}
