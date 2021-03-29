import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { replaceEmoji } from '@utils';
import { http } from '@libs/http';
import { SendButton } from './send-button';

export const Review = ({ id, reviewer, setState, setLoading }) => {
  const [comment, setComment] = useState(null);

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await http.post('creatives/', { action: 'review', reviewer, id, comment: replaceEmoji(comment) });

    setState(response === 'OK' ? 'thanks' : 'error');
    setLoading(false);
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <TextArea onChange={setComment} />
      <SendButton disabled={!comment} />
    </form>
  );
};
