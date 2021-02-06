import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';
import { EmailGroups, Squads } from './components';
import { Loading } from '@components/loading/loading';
import useStyles from './settings.styles'

const tabs = [{
  title: 'Email Groups',
  id: 'emailGroups',
  Component: EmailGroups,
}, {
  title: 'Squads',
  id: 'squads',
  Component: Squads,
}];

const tabProps = tab => ({
  id: `vertical-tab-${tab}`,
  'aria-controls': `vertical-tabpanel-${tab}`,
});

const tabContentProps = tab => ({
  id: `vertical-tabpanel-${tab}`,
  'aria-labelledby': `vertical-tab-${tab}`,
});

const Settings = ({ rootStore: { settings }}) => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [curTab, setCurTab] = useState(id ? tabs.findIndex(t => t.id === id) : 0);

  useEffect(() => {
    if (!settings.data) settings.fetch();
  }, []);

  const handleTabChange = (event, tab) => {
    setCurTab(tab);
    history.replace(`/settings/${tabs[tab].id}`);
  }

  if (!settings.data) return <Loading />;

  return (
    <div className={classes.root}>
      <Tabs
        value={curTab}
        orientation='vertical'
        variant='scrollable'
        indicatorColor='primary'
        textColor='primary'
        onChange={handleTabChange}
        className={classes.tabs}
      >
        {tabs.map(({ title }, index) => <Tab key={title} label={title} {...tabProps(index)} />)}
      </Tabs>
      <div className={classes.tabContent}>
        {tabs.map(({ Component, id, title }, index) => (
          <div key={title} {...tabContentProps(index)}>
            {index === curTab && <Component
              data={settings.data[id]}
              users={settings.users}
              onChange={data => settings.update({ [id]: data })}
            />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default inject('rootStore')(observer(Settings));
