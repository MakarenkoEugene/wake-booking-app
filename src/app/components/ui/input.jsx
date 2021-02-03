import React, { useEffect, useState } from 'react';
import MaterialTextField from '@material-ui/core/TextField';

export const Input = ({ onChange, startAdornment, value, ...props }) => {
  const [state, setState] = useState(value);

  useEffect(() => setState(value), [value]);

  const handleChange = ({ target: { value: val } }) => {
    const { min, max } = props.inputProps || {};

    if ((typeof min === 'number' && min > val) || (typeof max === 'number' && max < val)) {
      return;
    }

    setState(val);

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <MaterialTextField
      variant={props.variant || 'standard'}
      color={props.color || 'primary'}
      onChange={handleChange}
      value={state}
      {...props}
    />
  );
};
