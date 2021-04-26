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
  multiple,
  size,
  loading,
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
      getOptionLabel={((option) => {
        if (typeof optionLabel === 'string') return option[optionLabel];
        if (typeof optionLabel === 'function') return optionLabel(option);

        return option;
      })}
      renderInput={(params) => (
        <Input
          {...params}
          InputLabelProps={{ style: { padding: '18.5px 14px' } }}
          label={label}
          required={required}
          placeholder={placeholder}
        />
      )}
    />
  );
}
