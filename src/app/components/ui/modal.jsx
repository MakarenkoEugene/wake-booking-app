import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions } from '@material-ui/core';
import { Button } from '@components/ui/button';

export const Modal = ({
  onClose, component: C, title, cancelBtnTitle, confirmBtnTitle, SVG, ...props
}) => (
  <Dialog
    open={props.isOpen}
    fullWidth={props.fullWidth}
    maxWidth={props.fullWidth && 'xl'}
    onClose={() => onClose(false)}
    className={props.className}
  >
    {SVG && <SVG /> }
    {title && <DialogTitle>{title}</DialogTitle>}

    <DialogContent>
      {C
        ? <C onClose={onClose} data={props.data} />
        : <DialogContentText>{props.subTitle}</DialogContentText>}
    </DialogContent>

    <DialogActions>
      {cancelBtnTitle && <Button onClick={() => onClose(false)} variant='text'>{cancelBtnTitle}</Button>}
      {confirmBtnTitle && <Button onClick={() => onClose(true)}>{confirmBtnTitle}</Button>}
    </DialogActions>
  </Dialog>
);
