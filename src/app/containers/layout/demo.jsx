import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Tabs, Tab, Typography } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import PlayworksLogo from '@public/img/playworks-logo.svg';
import { Phone } from '@components/';
import './demo.scss';

const LayoutDemo = ({ rootStore: { creatives } }) => {
  const { params } = useRouteMatch();
  const [activeTab, setActiveTab] = useState();
  const { demos, titleAppName, advertiserName, issueKey, issueType } = creatives.creatives || {};

  useEffect(() => {
    if (params.id) creatives.get(params.id);
  }, [params?.id]);

  useEffect(() => {
    if (demos && demos.length) setActiveTab(demos[0].id);
  }, [demos]);

  return (
    <Grid
      id='demo'
      spacing={1}
      container
      direction='column'
      justify='space-between'
      wrap='nowrap'
    >

      <div>
        { advertiserName && <Typography variant='body1'>{advertiserName} ● {issueType?.name} (<a href={`https://jira.ironsrc.com/jira/browse/${issueKey}`}>{issueKey}</a>)</Typography> }
        <Typography variant='h3'>{titleAppName}</Typography>
      </div>

      <Grid
        spacing={1}
        item
        container
        wrap='nowrap'
        justify='space-between'
        alignItems='center'
        className='demo_main'
      >
        { demos && activeTab && (
          <div>
            <Typography variant='h5'>VERSION:</Typography>

            <Tabs
              orientation='vertical'
              variant='scrollable'
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              indicatorColor='primary'
              textColor='primary'
            >
              {demos.map(({ description, id }) => (
                <Tab key={id} value={id} label={description} />
              ))}
            </Tabs>
          </div>
        )}
        <Phone activeVersion={activeTab} assets={demos} />
        <div style={{ width: '300px', height: '50%', backgroundColor: 'yellow' }} />
      </Grid>

      <div>
        <PlayworksLogo />
      </div>
    </Grid>
  );
};

export default inject('rootStore')(observer(LayoutDemo));
