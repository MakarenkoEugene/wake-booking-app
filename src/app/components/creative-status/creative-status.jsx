import React from 'react';
import { inject, observer } from 'mobx-react';
import './creative-status.scss';

const CreativeStatus = ({ rootStore: { creatives } }) => {
  if (!creatives?.data) return null;

  return (
    <div className='creative_status'>
      <span className='badge'>PENDING</span>
      <h2>We are working on your creative.</h2>
      <p>We appreciate your feedback. We’ll upload a new version for your approval soon.</p>
    </div>
  );
};

export default inject('rootStore')(observer(CreativeStatus));
