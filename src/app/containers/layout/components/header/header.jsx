import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { AppBar, Toolbar, IconButton, Badge, Drawer, Divider, List, ListItem, Typography, Tabs, Tab } from '@material-ui/core';
import clsx from 'clsx';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom';
import { Button } from '@components/ui';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { Profile } from './profile';
import SelectPark from './select-park';

import { menuSchema, topMenu } from './menu-schema';

function Header({ rootStore: { user, ui }, classes }) {
  const history = useHistory();
  const pathnameTab = Object
    .values(topMenu)
    .findIndex(({ to }) => history.location.pathname.startsWith(to));

  const [activeTab, setActiveTab] = useState(pathnameTab !== -1 ? pathnameTab : null);
  const [anchorEl, setAnchor] = useState({});
  const [location, setLocation] = useState(window.location.pathname);
  const [title, setTitle] = useState(
    menuSchema.flat().reduce((a, e) => (location.includes(e.to) ? e : a), { text: '404 | Not Found' }).text,
  );

  const setAnchorEl = (path) => (e) => {
    setAnchor({ ...anchorEl, [path]: e });
  };

  const hendleLocation = (to, text) => {
    history.push({ pathname: to, search: window.location.search });
    setLocation(to);
    setTitle(text);
  };

  useEffect(() => {
    if (title) {
      document.title = title.split(' ').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }
  }, [title]);

  useEffect(() => {
    if (activeTab === null) return;
    const { to, text } = Object.values(topMenu)[activeTab];

    const alreadyThere = history.location.pathname.startsWith(to);

    hendleLocation(alreadyThere ? history.location.pathname : to, text);
  }, [activeTab]);

  return (
    <>
      <AppBar
        position='fixed'
        color='primary'
        className={clsx(classes.appBar, { [classes.appBarShift]: ui.drawerOpen })}
      >
        <Toolbar>
          { menuSchema[activeTab] && (
            <IconButton
              color='secondary'
              onClick={() => ui.setDrawerOpen(true)}
              edge='start'
              className={clsx(classes.menuButton, { [classes.hide]: ui.drawerOpen })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant='h6'
            color='secondary'
            style={{ textTransform: 'capitalize', width: '130px' }}
          >
            {title}
          </Typography>

          { activeTab !== null && (
            <Tabs
              indicatorColor='secondary'
              textColor='secondary'
              value={activeTab}
              variant='scrollable'
              scrollButtons='off'
              onChange={(e, v) => setActiveTab(v)}
            >
              <Tab label='Client' classes={{ root: classes.tab }} />
              <Tab label='Teacher' classes={{ root: classes.tab }} />
              <Tab label='Admin' classes={{ root: classes.tab }} />
            </Tabs>
          )}
          <div className={classes.grow} />
          { activeTab === 2 && user.parks?.length > 1 && (
            <Button
              variant='outlined'
              color='secondary'
              onClick={(event) => setAnchorEl('selectPark')(event.currentTarget)}
            >
              <HomeIcon style={{ marginRight: '5px' }} />
              <Typography variant='subtitle1'>{user.activePark?.name}</Typography>
            </Button>
          )}
          <IconButton>
            <Badge badgeContent={17} color='error'>
              <NotificationsIcon color='secondary' />
            </Badge>
          </IconButton>
          <IconButton onClick={(event) => setAnchorEl('profile')(event.currentTarget)}>
            <AccountCircle color='secondary' />
          </IconButton>
          <IconButton onClick={() => {
            const themeType = window.localStorage.getItem('theme');
            window.localStorage.setItem('theme', themeType === 'dark' ? 'light' : 'dark');
            history.go(0);
          }}
          >
            <InvertColorsIcon color='secondary' />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Profile anchorEl={anchorEl.profile} setAnchorEl={setAnchorEl('profile')} />
      <SelectPark anchorEl={anchorEl.selectPark} setAnchorEl={setAnchorEl('selectPark')} />
      { menuSchema[activeTab]
        && !menuSchema[activeTab].filter(({ disabled }) => disabled).length && (
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: ui.drawerOpen,
            [classes.drawerClose]: !ui.drawerOpen,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: ui.drawerOpen,
              [classes.drawerClose]: !ui.drawerOpen,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <Typography
              variant='h6'
              onClick={() => {
                hendleLocation('/', 'Main');
              }}
            >
              Logo
            </Typography>
            <div className={classes.grow} />
            <IconButton onClick={() => ui.setDrawerOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuSchema[activeTab].map(({ to, text, Icon, disabled }) => !disabled && (
              <ListItem
                selected={to === location}
                className={classes.listItem}
                key={uuid()}
                onClick={() => hendleLocation(to, text)}
                button
              >
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
}

export default inject('rootStore')(observer(Header));
