import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, FileUpload, Table } from '@components/ui';
import { Loading } from '@components/loading/loading';
import { Typography, Grid } from '@material-ui/core';
import { AdvertiserModal } from './components/advertiser-modal';
import './advertisers.scss';

const columns = [
  { id: 'advertiserId', label: 'Advertiser ID' },
  { id: 'advertiser', label: 'Advertiser', width: 300 },
  { id: 'squad', label: 'Squad', width: 100 },
  { id: 'tier', label: 'Tier' },
  { id: 'skipApproval', label: 'Skip Approval' },
];

const Advertisers = ({ rootStore: { advertisersStore, uiStore } }) => {
  useEffect(() => {
    if (!advertisersStore.list.length) {
      advertisersStore.fetch();
    }
  }, []);

  if (advertisersStore.loading) return <Loading />;

  const openModal = (data) => uiStore.showModal({
    data,
    title: 'Add new advertiser',
    component: AdvertiserModal,
  });

  const uploadCsv = (data) => advertisersStore.bulkUpdate(data);

  return (
    <div className='advertisers'>
      <Grid container justify='space-between' alignContent='center' alignItems='center' className='header'>
        <Typography variant='h3'>Advertisers</Typography>

        <div>
          <FileUpload onChange={uploadCsv} color='secondary'>Bulk update</FileUpload>
          <Button onClick={() => openModal()}>Add</Button>
        </div>
      </Grid>

      <Table
        data={advertisersStore.list}
        columns={columns}
        pagination
        filter
        editable
        order='asc'
        orderBy='advertiser'
        id='advertiserId'
        onEdit={openModal}
      />
    </div>
  );
};

export default inject('rootStore')(observer(Advertisers));
