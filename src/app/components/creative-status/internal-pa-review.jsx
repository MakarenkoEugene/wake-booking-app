import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { SendButton } from './send-button';

export const InternalPAReview = () => {
  const [coment, setComent] = useState(null);

  const hendleOnSubmit = (e) => {
    e.preventDefault();

    console.log('InternalPAReview', { coment });
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <TextArea onChange={setComent} />
      <SendButton disabled={!coment} />
    </form>
  );
};
