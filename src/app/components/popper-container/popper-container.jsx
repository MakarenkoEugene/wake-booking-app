import React from 'react';
import { Menu } from '@material-ui/core';

export const PopperContainer = ({ anchorEl, setAnchorEl, children }) => (
  <Menu
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={() => setAnchorEl(null)}
  >
    { children }
  </Menu>
);
