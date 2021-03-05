import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';
import './creative-status.scss';
import { Approved, Pending, Paused, Live, ResponseError, Thanks } from './info-status';
import { AdvApproval } from './adv-approval';
import { Review } from './review';
import { InternalPA } from './internal-pa';
import { InternalIEC } from './internal-iec';

const CreativeStatus = ({ rootStore: { creatives }, className }) => {
  const stateConfigs = [
    { state: ['internalPA'], Component: InternalPA, props: creatives.data, labels: true },
    { state: ['internalIEC'], Component: InternalIEC, props: creatives.data },
    { state: ['review'], Component: Review, props: creatives.data },
    { state: ['advApproval'], Component: AdvApproval },
    { state: ['approved'], Component: Approved, info: true },
    { state: ['disapproved'], Component: Pending, info: true },
    { state: ['out'], Component: Paused, info: true },
    { state: ['done'], Component: Live, info: true },
    { state: ['error'], Component: ResponseError, info: true },
    { state: ['thanks'], Component: Thanks, info: true, props: { message: creatives.data.approversMessage } },
  ];

  const config = stateConfigs.find(({ state }) => state.includes(creatives.state));

  const { Component, info, labels, props } = config || {};

  useEffect(() => {
    creatives.setIsInfoState(info);
  }, [info]);

  if (!Component || !creatives.data) return null;

  return (
    <div className={clsx('creative_status_wrapper', info && 'info', className)}>
      { !info && (labels ? <h4>LABELS:</h4> : <h4>FEEDBACK:</h4>)}
      <div className='creative_status'>
        <Component {...props} />
      </div>
    </div>
  );
};

export default inject('rootStore')(observer(CreativeStatus));
