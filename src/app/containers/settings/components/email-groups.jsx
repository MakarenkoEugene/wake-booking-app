import React, { useState } from 'react';
import { Autocomplete } from '@components/ui';

export const EmailGroups = ({ data, users, onChange }) => {
  const [state, setState] = useState(data);

  const handleChange = (group) => (value) => {
    const newState = { ...state, [group]: value.map((u) => u.username) };

    setState(newState);
    onChange(newState);
  };

  return (
    <div>
      <Autocomplete
        multiple
        options={users}
        value={users.filter((u) => state.playtest.includes(u.username))}
        label='PA Playtest'
        onChange={handleChange('playtest')}
        users
      />

      <Autocomplete
        multiple
        options={users}
        value={users.filter((u) => state.paEditLabels.includes(u.username))}
        label='PA Edit Labels'
        onChange={handleChange('paEditLabels')}
        users
      />
    </div>
  );
};
