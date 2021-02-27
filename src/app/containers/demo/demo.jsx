import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
// import { useLocation, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
/* eslint-disable import/no-unresolved */
import { useWindowSize } from '@hooks';
import PlayworksLogo from '@public/img/playworks-logo.svg';
import Rocket from '@public/img/rocket.svg';
import { Phone, Version, CreativeStatus, Loading } from '@components/';
import { Modal } from '@components/ui';
import './demo.scss';

const Demo = ({ rootStore: { creatives } }) => {
  const { id } = useParams();
  const { titleAppName, advertiserName, issueKey, issueType, type } = creatives.data || {};
  const { userDevice, isInfoState, showModal } = creatives;
  const [width, height] = useWindowSize();

  // const query = new URLSearchParams(useLocation().search);
  // console.log(query.get('feedback'), query.get('reviewer'));

  useEffect(() => {
    if (width < 540 || (height < 540 && width < 820)) {
      if (userDevice !== 'phone') creatives.setUserDevice('phone');
    } else if (userDevice === 'phone') {
      creatives.setUserDevice('');
    }
  }, [width]);

  useEffect(() => {
    if (id) creatives.get(id);
  }, [id]);

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

  if (creatives.loading) return <Loading />;

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
                  (<a href={`https://jira.ironsrc.com/jira/browse/${issueKey}`}>{issueKey}</a>)
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
