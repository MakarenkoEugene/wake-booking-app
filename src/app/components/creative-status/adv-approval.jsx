import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { http } from '@libs/http';
import { SendButton } from './send-button';
import { ReadyToGo } from './ready-to-go';

export const AdvApproval = ({ id, setState, setLoading }) => {
  const [readyToGo, setReadyToGo] = useState(null);
  const [comment, setcomment] = useState(null);

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // adv-approve
    const response = await http.post('creatives/', {
      action: 'adv-approve',
      id,
      isApproved: readyToGo,
      comment,
    });

    setState(response === 'OK' ? 'thanks' : 'error');
    setLoading(false);
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <ReadyToGo onChange={setReadyToGo} />
      <TextArea onChange={setcomment} />
      <SendButton disabled={readyToGo === null} />
    </form>
  );
};
