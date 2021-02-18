import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import './phone.scss';

export const Phone = ({ activeVersion, assets }) => {
  const [orientation, setOrientation] = useState('portrait');

  if (!assets || !activeVersion) return null;
  console.log(orientation);

  return (
    <Grid
      item
      container
      direction='column'
      wrap='nowrap'
      alignItems='center'
      className='phone_container'
    >
      <div id='phone' className={orientation}>
        <div className='screen3'>
          <div className='screen2'>
            <div className='screen'>
              <div className='notch'>
                <div className='speaker' />
                <div className='fcamera' />
              </div>
              <iframe
                id='pa'
                style={orientation === 'portrait'
                  ? { width: '300px', height: '666px' }
                  : { width: '666px', height: '300px' }}
                src={assets.find((e) => e.id === activeVersion).url}
                frameBorder='0'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='controle'>
        <button
          type='button'
          onClick={() => setOrientation(orientation === 'lendscape' ? 'portrait' : 'lendscape')}
        >
          rotate
        </button>
      </div>
    </Grid>
  );
};
