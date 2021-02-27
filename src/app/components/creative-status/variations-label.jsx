import React, { useState } from 'react';
import { Autocomplete } from '@components/ui';

export const VariationsLabel = ({
  options,
  selectedOption: { name, labels },
  onChange,
  withOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      { withOpen && (
      <button
        type='button'
        className='label_toggle'
        onClick={() => setIsOpen(!isOpen)}
      >
        Edit Labels
      </button>
      )}

      { (isOpen || !withOpen) && (
      <Autocomplete
        label={`${name} labels`}
        multiple
        value={labels}
        options={options}
        disabled={withOpen ? !isOpen : false}
        onChange={(newLabels) => onChange({ name, labels: newLabels })}
      />
      )}
    </>
  );
};
