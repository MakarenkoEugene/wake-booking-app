import React, { useEffect, useState } from 'react';
import MaterialTextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';

export const Input = ({ onChange, startAdornment, type, value, ...props }) => {
  const [state, setState] = useState(value);
  const theme = useTheme();

  useEffect(() => setState(value), [value]);

  // needed to block user input
  const handleKeyDown = (event) => {
    if (type === 'phone') {
      if (['Backspace', 'Enter', 'Tab'].includes(event.key)) return;

      if (value.length < 12) {
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(event.key)) return;
      }

      event.preventDefault();
      event.stopPropagation();
    } else if (type === 'number') {
      // block '-' and 'e' in [type="number"]
      if ([69, 189].includes(event.keyCode)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  const handleChange = (e) => {
    let v = e.target.value;

    const { min, max } = props.inputProps || {};

    if (type === 'number') {
      if (typeof min === 'number' && min > v) return;
      if (typeof max === 'number' && max < v) return;

      v = Number(v).toString();
    }

    setState(v);

    if (onChange) onChange(v);
  };

  return (
    <MaterialTextField
      variant={props.variant || 'outlined'}
      color={props.color || 'primary'}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={state}
      type={type !== 'phone' ? type : 'text'}
      style={{ width: '100%' }}
      {...props}
      InputLabelProps={{
        shrink: true,
        style: { color: theme.palette.primary.main },
      }}
    />
  );
};
