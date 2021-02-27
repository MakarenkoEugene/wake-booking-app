import React from 'react';
// eslint-disable-next-line import/no-unresolved
import SendIcon from '@public/img/send.svg';

export const SendButton = ({ disabled }) => (

  <button type='submit' disabled={disabled}><SendIcon /> Send</button>
);
