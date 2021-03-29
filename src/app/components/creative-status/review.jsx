import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { http } from '@libs/http';
import { SendButton } from './send-button';

export const Review = ({ id, reviewer, setState, setLoading }) => {
  const [comment, setComment] = useState(null);

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // review
      await http.post('creatives/', { action: 'review', reviewer, id, comment });

      setState('thanks');
    } catch (error) {
      setState('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <TextArea onChange={setComment} />
      <SendButton disabled={!comment} />
    </form>
  );
};
