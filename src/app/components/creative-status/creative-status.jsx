import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import './creative-status.scss';
import { Approved, Pending, Paused, Live, ResponseError, Thanks } from './info-status';
import { InternalReview } from './internal-review';
import { InternalPAReview } from './internal-pa-review';
import { InternalPALabels } from './internal-pa-labels';
import { InternalIECReview } from './internal-iec-rewiev';

const CreativeStatus = ({ rootStore: { creatives }, className }) => {
  // TODO remove
  const stateConfigs = [
    { state: ['internal-pa-labels'], Component: InternalPALabels, props: creatives.data, labels: true },
    { state: ['internal-iec-rewiew'], Component: InternalIECReview, props: creatives.data },
    { state: ['internal-pa-review'], Component: InternalPAReview },
    { state: ['internal-review'], Component: InternalReview },
    { state: ['approved'], Component: Approved, info: true },
    { state: ['pending'], Component: Pending, info: true },
    { state: ['paused'], Component: Paused, info: true },
    { state: ['live'], Component: Live, info: true },
    { state: ['error'], Component: ResponseError, info: true },
    { state: ['thanks'], Component: Thanks, info: true },
    { state: ['thanks-iec-rewiev'],
      Component: Thanks,
      info: true,
      props: { message: '1/2 responded \n1 approved\n 0 disapproved' } },
  ];

  const config = stateConfigs.find(({ state }) => state.includes(creatives.state));

  const { Component, info, labels, props } = config || {};

  useEffect(() => {
    creatives.setIsInfoState(info);
  }, [info]);

  if (!Component || !creatives.data) return null;

  return (
    <div className={`creative_status_wrapper ${info ? 'info' : ''} ${className}`}>
      { !info && (labels ? <h4>LABELS:</h4> : <h4>FEEDBACK:</h4>)}
      <div className='creative_status'>
        <Component {...props} />
      </div>
    </div>
  );
};

export default inject('rootStore')(observer(CreativeStatus));
