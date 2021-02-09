import React, { useState } from 'react';
import { Autocomplete } from '@components/ui';

export const EmailGroups = ({ data, users, onChange, hasAccess }) => {
  const [state, setState] = useState(data);

  const handleChange = (group) => (value) => {
    const newState = {
      ...state,
      [group]: Array.isArray(value)
        ? value.map((u) => u.username)
        : value.username,
    };

    setState(newState);
    onChange(newState);
  };

  return (
    <div>
      {!hasAccess && <div className='overlay' />}

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

      <Autocomplete
        multiple
        options={users}
        value={users.filter((u) => state.pttDuplicate.includes(u.username))}
        label='PTT Duplicate'
        onChange={handleChange('pttDuplicate')}
        users
      />

      <Autocomplete
        options={users}
        value={users.find((u) => state.plwxQaLead === u.username)}
        label='Playworks QA Lead'
        onChange={handleChange('plwxQaLead')}
        users
      />
    </div>
  );
};
