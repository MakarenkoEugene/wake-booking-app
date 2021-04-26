import React from 'react';
import {
  Radio,
  RadioGroup as MatRadioGroup,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

export function RadioGroup({ label, name, value, onChange, options, ...props }) {
  return (
    <MatRadioGroup {...props} name={name} value={value} onChange={(e) => onChange(e.target.value)}>
      {label && <Typography variant='subtitle1' gutterBottom>{label}</Typography>}
      <div>
        {options.map((elem) => (
          <FormControlLabel
            key={elem.id || elem}
            value={elem.id || elem} // security ????
            label={elem.title || elem}
            control={<Radio color={props.color || 'primary'} />}
          />
        ))}
      </div>
    </MatRadioGroup>
  );
}
