import React from 'react';
import { MenuItem } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { PopperContainer } from '@components';

const SelectPark = ({ rootStore: { user }, anchorEl, setAnchorEl }) => {
  const onChange = (index) => {
    user.setActiveParkIndex(index);
    setAnchorEl(null);
  };

  return (
    <PopperContainer anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
      { user.parks?.map(({ name }, i) => (
        <MenuItem
          key={name}
          selected={i === user.activeParkIndex}
          onClick={() => onChange(i)}
        >
          {name.toUpperCase()}
        </MenuItem>
      ))}
    </PopperContainer>
  );
};

export default inject('rootStore')(observer(SelectPark));
