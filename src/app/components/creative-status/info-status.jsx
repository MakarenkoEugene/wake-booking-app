import React from 'react';

export const Pending = () => (
  <>
    <span className='badge pending'>PENDING</span>
    <h2>We are working on your creative.</h2>
    <p>We appreciate your feedback. We’ll upload a new version for your approval soon.</p>
  </>
);

export const Approved = () => (
  <>
    <span className='badge approved'>APPROVED</span>
    <h2>Creative approved!</h2>
    <p>Hang tight to see it live shortly.</p>
  </>
);

export const Paused = () => (
  <>
    <span className='badge paused'>PAUSED</span>
    <h2>Creative paused.</h2>
    <p>Creative is paused. Please contact your AM for detals.</p>
  </>
);

export const ResponseError = () => (
  <>
    <span className='badge paused'>ERROR</span>
    <h2>Something went wrong.</h2>
    <p>Try again later.</p>
  </>
);

export const Live = () => (
  <>
    <span className='badge live'>LIVE</span>
    <h2>This ad is live!</h2>
    <p>Awesome! It`s out there.</p>
  </>
);

export const Thanks = ({ message }) => (
  <>
    <span className='badge approved'>SUCCESS</span>
    <h2>Thanks for your feedback!</h2>
    <p style={{ whiteSpace: 'pre-line' }}>{message}</p>
  </>
);
