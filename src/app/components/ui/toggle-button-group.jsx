import React, { memo } from 'react';
import { ToggleButton, ToggleButtonGroup as MatToggleButtonGroup } from '@material-ui/lab';
import { Tooltip } from '@material-ui/core';

const Component = (props) => (
  <MatToggleButtonGroup
    exclusive
    value={props.value}
    onChange={(e, v) => props.onChange(v)}
  >
    {props.options.map((i) => (
      <ToggleButton value={i.value} key={i.value}>
        <Tooltip title={i.tooltip}>
          {i.icon}
        </Tooltip>
      </ToggleButton>
    ))}
  </MatToggleButtonGroup>
);

export const ToggleButtonGroup = memo(Component);
