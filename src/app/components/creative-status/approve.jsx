/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export const Approve = ({ onChange }) => (
  <div className='ready_to_go'>
    <h3>Ready to go live?</h3>

    <div>
      <input onChange={() => onChange(true)} type='radio' name='ready' id='approve' />
      <label htmlFor='approve'>Approve</label>

      <input onChange={() => onChange(false)} type='radio' name='ready' id='disapprove' />
      <label htmlFor='disapprove'>Not approve</label>
    </div>

  </div>
);
