import React from 'react';
import { inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { headerMenu } from '@app/consts';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Button } from '@components/ui';
import { Logo } from './logo';
import useStyles from './header.styles';

const Header = ({ rootStore: { user }}) => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h5' className={classes.logo}>
            <NavLink to='/'><Logo /></NavLink>
          </Typography>

          <Box flexDirection='row' display='flex' className={classes.menu}>
            {headerMenu.map((item) => (
              <NavLink to={item.href} className='nav-link' key={item.href}>
                <Button variant='text' color='inherit'>
                    {item.title}
                </Button>
              </NavLink>
            ))}
          </Box>

          {user.isLoggedIn
            ? <div>Hi, {user.name}</div>
            : <a href={`${process.env.API_URL}/auth/google`}><Button variant='text' color='inherit'>Login</Button></a>
          }
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default inject('rootStore')(Header);
