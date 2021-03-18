import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
/* eslint-disable import/no-unresolved */
import { useWindowSize } from '@hooks';
import PlayworksLogo from '@public/img/playworks-logo.svg';
import Rocket from '@public/img/rocket.svg';
import { Phone, Version, CreativeStatus } from '@components/';
import { Modal } from '@components/ui';
import './demo.scss';

const Demo = ({ rootStore: { creatives } }) => {
  const { titleAppName, advertiserName, issueKey, issueType, type } = creatives.data || {};
  const { userDevice, isInfoState, showModal } = creatives;
  const [width, height] = useWindowSize();
  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const feedback = query.get('feedback');
    const reviewer = query.get('reviewer');
    const approver = query.get('approver');

    creatives.setQuery({ reviewer, feedback, approver });
  }, [query]);

  useEffect(() => {
    if (width < 540 || (height < 540 && width < 820)) {
      if (userDevice !== 'phone') creatives.setUserDevice('phone');
    } else if (userDevice === 'phone') {
      creatives.setUserDevice('');
    }
  }, [width]);

  useEffect(() => {
    const func = ({ data }) => {
      try {
        if (type === 'pa' && JSON.parse(data.substring('<->'.length)).event_type === 'Convert') creatives.setShowModal(true);
        if (JSON.parse(data.substring('!!!'.length)).name === 'openUrlCalled') creatives.setShowModal(true);
      } catch (err) {
        // console.log(err);
      }
    };

    window.addEventListener('message', func);

    return () => {
      window.removeEventListener('message', func);
    };
  }, [type]);

  return (
    <>
      <Modal
        isOpen={showModal}
        SVG={Rocket}
        className='click_detected'
        onClose={() => creatives.setShowModal(false)}
        confirmBtnTitle='Got it'
        title='Wooshhh!'
        subTitle={'Click has been successfully \n detected!'}
      />
      { width <= 1200 && isInfoState && <CreativeStatus /> }
      <Grid id='demo' spacing={1} container direction='column' justify='space-between' wrap='nowrap'>
        <div className='creative-metadata'>
          { creatives?.data
            ? (
              <>
                <p>{advertiserName} ● {issueType?.name}
                  (<a href={`https://jira.ironsrc.com/jira/browse/${issueKey}`} target='_blank' rel='noreferrer'>{issueKey}</a>)
                </p>
                <h1>{titleAppName}</h1>
              </>
            )
            : <h1>No creative data</h1>}
        </div>

        <Grid spacing={1} item container wrap='nowrap' justify='space-between' alignItems='center' className='demo_main'>
          <Version />
          <Phone />
          { width > 1200 && <CreativeStatus className='right_modal' /> }
        </Grid>
        { width <= 1200 && !isInfoState && <CreativeStatus /> }

        <PlayworksLogo />
      </Grid>
    </>
  );
};

export default inject('rootStore')(observer(Demo));
