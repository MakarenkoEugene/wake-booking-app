import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { SendButton } from './send-button';
import { ReadyToGo } from './ready-to-go';

export const AdvApproval = () => {
  const [readyToGo, setReadyToGo] = useState(null);
  const [coment, setComent] = useState(null);

  const hendleOnSubmit = (e) => {
    e.preventDefault();

    console.log('AdvApproval', { readyToGo, coment });
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <ReadyToGo onChange={setReadyToGo} />
      <TextArea onChange={setComent} />
      <SendButton disabled={readyToGo === null} />
    </form>
  );
};
