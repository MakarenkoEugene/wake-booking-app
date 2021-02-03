import React from 'react';
import {
  Radio,
  FormLabel,
  RadioGroup as MatRadioGroup,
  FormControlLabel,
} from '@material-ui/core';

export function RadioGroup({ label, name, value, onChange, options, ...props }) {
  return (
    <MatRadioGroup {...props} name={name} value={value} onChange={(e) => onChange(e.target.value)}>
      {label && <FormLabel>{label}</FormLabel>}
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
