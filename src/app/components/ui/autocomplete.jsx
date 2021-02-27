import React from 'react';
import MaterialAutocomplete from '@material-ui/lab/Autocomplete';
import { Input } from './input';

const getUserLabel = ({ username }) => username.split('.').map((i) => i.charAt(0).toUpperCase() + i.slice(1)).join(' ');

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
  multiple,
  size,
  loading,
  users,
}) {
  return (
    <MaterialAutocomplete
      multiple={multiple}
      size={size || 'small'}
      loading={loading}
      options={options || []}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      groupBy={groupBy}
      onChange={(e, v) => onChange(v)}
      disableClearable
      blurOnSelect
      openOnFocus
      defaultValue={defaultValue}
      getOptionLabel={users ? getUserLabel : ((option) => option[optionLabel] || option)}
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
