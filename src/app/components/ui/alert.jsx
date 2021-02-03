import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export function Alert({
  children,
  vertical = 'top',
  horizontal = 'center',
  canBeClosed = false,
  ...props
}) {
  const [open, setOpen] = useState(true);

  // eslint-disable-next-line no-param-reassign
  if (canBeClosed) props.onClose = () => setOpen(false);

  return (
    <Snackbar anchorOrigin={{ vertical, horizontal }} open={open}>
      <MuiAlert variant='filled' {...props}>
        {children}
      </MuiAlert>
    </Snackbar>
  );
}
