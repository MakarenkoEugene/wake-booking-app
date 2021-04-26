import React from 'react';
import { MenuItem } from '@material-ui/core';
import { PopperContainer } from '@components';

export const Profile = ({ anchorEl, setAnchorEl }) => {
  console.log();
  return (
    <PopperContainer anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
      <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
      <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
    </PopperContainer>
  );
};
