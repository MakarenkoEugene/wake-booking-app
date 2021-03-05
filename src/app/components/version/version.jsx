import React from 'react';
import clsx from 'clsx';
import { Button } from '@components/ui/button';
import { inject, observer } from 'mobx-react';
import { Typography } from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import ImagePlay from '@public/img/play.svg';
import './version.scss';

const LayoutDemo = ({ rootStore: { creatives } }) => {
  const { selectVersion, data, userDevice } = creatives;
  const { demos: versions } = data || {};

  if (!versions) return null;

  return (
    <div className='version'>
      { userDevice !== 'phone' && <Typography variant='body1'>VERSION:</Typography> }
      {versions.map((version) => (
        <Button
          key={version.id}
          variant='outlined'
          color='primary'
          className={clsx(userDevice, version.id === selectVersion.id && 'select_version')}
          onClick={() => {
            creatives.selectVersion(version);
          }}
        >
          { userDevice === 'phone' && <div className='play_icon'><ImagePlay /></div> }
          <p>{version.description}</p>
          { userDevice === 'phone' && <span>{version.id}</span>}
        </Button>
      ))}

      {/* TODO remove */}
      <select onChange={(e) => creatives.setState(e.target.value)}>
        <option label='approved' value='approved' />
        <option label='pending' value='pending' />
        <option label='paused' value='paused' />
        <option label='live' value='live' />
        <option label='advApproval' value='advApproval' />
        <option label='review' value='review' />
        <option label='internalPA' value='internalPA' />
        <option label='internalIEC' value='internalIEC' />
        <option label='error' value='error' />
        <option label='thanks' value='thanks' />
        <option label='thanks-iec-rewiev' value='thanks-iec-rewiev' />
        <option label='none' value='none' />
      </select>
    </div>
  );
};

export default inject('rootStore')(observer(LayoutDemo));
