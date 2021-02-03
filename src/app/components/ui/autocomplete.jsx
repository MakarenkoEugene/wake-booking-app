import React from 'react';
import MaterialAutocomplete from '@material-ui/lab/Autocomplete';
import { Input } from './input';

export function Autocomplete({
  options,
  optionLabel = 'title',
  value,
  groupBy,
  label,
  placeholder,
  required,
  name,
  id,
  onChange,
  disabled,
  defaultValue,
}) {
  return (
    <MaterialAutocomplete
      options={options}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      groupBy={groupBy}
      onChange={onChange}
      disableClearable
      blurOnSelect
      openOnFocus
      defaultValue={defaultValue}
      getOptionLabel={(option) => option[optionLabel] || option}
      renderInput={(params) => (
        <Input
          {...params}
          label={label}
          required={required}
          placeholder={placeholder}
        />
      )}
    />
  );
}
