/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export const ReadyToGo = ({ onChange }) => (
  <div className='ready_to_go'>
    <h3>Ready to go live?</h3>

    <div>
      <input onChange={() => onChange(true)} type='radio' name='ready' id='appruved' />
      <label htmlFor='appruved'>Appruved</label>

      <input onChange={() => onChange(false)} type='radio' name='ready' id='disappruved' />
      <label htmlFor='disappruved'>Not approved</label>
    </div>

  </div>
);
