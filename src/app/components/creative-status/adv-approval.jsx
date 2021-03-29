import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { http } from '@libs/http';
import { SendButton } from './send-button';
import { Approve } from './approve';

export const AdvApproval = ({ id, setState, setLoading }) => {
  const [isApproved, setIsApproved] = useState(null);
  const [comment, setcomment] = useState(null);

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // adv-approve
      await http.post('creatives/', {
        action: 'adv-approve',
        id,
        isApproved,
        comment,
      });

      setState('thanks');
    } catch (error) {
      setState('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <Approve onChange={setIsApproved} />
      <TextArea onChange={setcomment} />
      <SendButton disabled={isApproved === null} />
    </form>
  );
};
