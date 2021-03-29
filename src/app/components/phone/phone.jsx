import React, { useRef, useState } from 'react';
import { Grid } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import clsx from 'clsx';
/* eslint-disable import/no-unresolved */
import PhoneFrame from '@public/img/iphone.svg';
import ImageRload from '@public/img/reload.svg';
import ImageRotate from '@public/img/rotate.svg';
import ImageClose from '@public/img/close.svg';
import TVNoise from '@public/img/tv-noise.gif';

import './phone.scss';

const Phone = ({ rootStore: { creatives } }) => {
  const { selectedVersion, userDevice, isOpen, data } = creatives;
  const isFreeOrientation = data ? data.isFreeOrientation : true;

  const [orientation, setOrientation] = useState(data?.defaultOrientation || 'portrait');

  const iframeRef = useRef(null);

  const forceUpdateIframe = () => {
    iframeRef.current.src = selectedVersion.url;
  };

  const changeOrientation = () => {
    setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait');
  };

  if (userDevice === 'phone' && !isOpen) return null;

  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      alignItems='center'
      justify='center'
      alignContent='center'
      className={clsx('phone_container', userDevice === 'phone' && 'device_is_phone')}
    >
      <div id='phone' className={orientation}>
        { userDevice !== 'phone' && <PhoneFrame className='phone_frame' />}
        {
          // TODO fix url dapiHijacker move it to server
          selectedVersion?.url
            ? <iframe ref={iframeRef} className='phone_content' src={data.type === 'iec' ? `${process.env.API_URL}/demo/snippets/dapiHijacker.html?adUrl=${selectedVersion.url}` : selectedVersion.url} frameBorder='0' />
            : <div className='phone_content' style={{ backgroundImage: `url(${TVNoise})` }} />
        }
      </div>
      <div className='phone_controle'>
        <button type='button' onClick={forceUpdateIframe}>
          <ImageRload />
        </button>
        {userDevice !== 'phone'
          ? <button type='button' disabled={!isFreeOrientation} onClick={changeOrientation}> <ImageRotate /> </button>
          : <button type='button' onClick={creatives.changeIsOpen}> <ImageClose /> </button>}
      </div>
    </Grid>
  );
};

export default inject('rootStore')(observer(Phone));
