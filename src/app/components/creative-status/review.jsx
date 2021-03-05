import React, { useState } from 'react';
import { TextArea } from '@components/ui';
import { http } from '@libs/http';
import { SendButton } from './send-button';

export const Review = ({ _id, reviewer, ...res }) => {
  console.log(reviewer, res);
  const [comment, setComment] = useState(null);

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    const asd = await http.post('creatives/', { action: 'review', reviewer, id: _id, comment });
    console.log(asd);
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <TextArea onChange={setComment} />
      <SendButton disabled={!comment} />
    </form>
  );
};
