import React, { useState } from 'react';
import { Autocomplete } from '@components/ui';
import { Paper, AppBar, Tabs, Tab } from '@material-ui/core';

export const Squads = ({ data, users, onChange }) => {
  const [curTab, setCurTab] = useState(0);
  const [state, setState] = useState(data);

  const squads = Object.keys(data);
  const curSquad = squads[curTab];

  const handleChange = (squad, group) => (value) => {
    const newState = {
      ...state,
      [squad]: {
        [group]: value.map((u) => u.username),
      },
    };

    setState(newState);
    onChange(newState);
  };

  const handleTabChange = (event, tab) => setCurTab(tab);

  return (
    <Paper style={{ width: '100%' }}>
      <AppBar position='static' color='default'>
        <Tabs
          value={curTab}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          {squads.map((s) => <Tab key={s} label={s} />)}
        </Tabs>
      </AppBar>

      <div style={{ padding: 20 }}>
        <Autocomplete
          multiple
          options={users}
          value={users.filter((u) => data[curSquad].gameDesigners.includes(u.username))}
          label='Game Designers'
          onChange={handleChange(curSquad, 'gameDesigners')}
          users
        />

        <Autocomplete
          multiple
          options={users}
          value={users.filter((u) => data[curSquad].designers.includes(u.username))}
          label='Designers'
          onChange={handleChange(curSquad, 'designers')}
          users
        />
      </div>
    </Paper>
  );
};
