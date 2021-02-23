import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
/* eslint-disable import/no-unresolved */
import { useWindowSize } from '@hooks';
import PlayworksLogo from '@public/img/playworks-logo.svg';
import { Phone, Version, CreativeStatus } from '@components/';
import './demo.scss';

const Demo = ({ rootStore: { creatives } }) => {
  const { params } = useRouteMatch();
  const { titleAppName, advertiserName, issueKey, issueType } = creatives.data || {};
  const { userDevice } = creatives;
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (width < 540 || (height < 540 && width < 820)) {
      if (userDevice !== 'phone') creatives.setUserDevice('phone');
    } else if (userDevice === 'phone') {
      creatives.setUserDevice('');
    }
  }, [width]);

  useEffect(() => {
    if (params.id) creatives.get(params.id);
  }, [params?.id]);

  return (
    <>
      { width <= 1200 && <CreativeStatus /> }
      <Grid id='demo' spacing={1} container direction='column' justify='space-between' wrap='nowrap'>
        <div className='creative-metadata'>
          { advertiserName && (
            <p>{advertiserName} ● {issueType?.name}
              (
              <a href={`https://jira.ironsrc.com/jira/browse/${issueKey}`}>{issueKey}</a>
              )
            </p>
          )}
          <h1>{titleAppName}</h1>
        </div>

        <Grid spacing={1} item container wrap='nowrap' justify='space-between' alignItems='center' className='demo_main'>
          <Version />
          <Phone />
          { width > 1200 && <CreativeStatus /> }
        </Grid>

        <PlayworksLogo />
      </Grid>
    </>
  );
};

export default inject('rootStore')(observer(Demo));
