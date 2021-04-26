import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Divider } from '@material-ui/core';
import { WinchForm, Form, LineBlock } from '@components';
import { findChanges, formValidate } from '@utils';
import { Button } from '@components/ui';

import AddIcon from '@material-ui/icons/Add';

const Winch = ({ rootStore: { ui, user } }) => {
  const [newlyEstablished, setNewlyEstablished] = useState('');
  const [close, onClose] = useState(true);
  const [created, setCreated] = useState(true);
  const [defaultValue, setDefaultValue] = useState({});
  const [state, setState] = useState({});
  const [valid, setValid] = useState({ name: false });
  const [validate, setValidate] = useState(() => ({}));

  useEffect(() => {
    const required = {
      all: (v) => JSON.stringify(defaultValue) !== JSON.stringify(v),
      name: (v) => v && v.trim().length > 2,
      height: (v) => Number(v) > 1,
      length: (v) => Number(v) > 1,
    };

    setValidate(() => formValidate(required));
  }, [defaultValue]);

  const onChange = (field) => (value) => {
    const newState = { ...state, [field]: value };

    const newValid = validate(newState, created);

    setState(newState);
    setValid(newValid);
  };

  const onEstablished = (id, timeOut = 3000) => {
    setNewlyEstablished(id);
    setTimeout(() => { setNewlyEstablished(''); }, timeOut);
  };

  const update = async (event) => {
    event.preventDefault();
    const parkId = user.activePark._id;

    const { _id: winchId } = state;
    const updatedData = findChanges(state, defaultValue);

    const req = { techParams: {} };

    if (updatedData.name) req.name = updatedData.name;
    if (updatedData.description) req.description = updatedData.description;
    if (updatedData.height) req.techParams.height = updatedData.height;
    if (updatedData.length) req.techParams.length = updatedData.length;
    if (updatedData.manufacturer) req.techParams.manufacturer = updatedData.manufacturer;

    ui.setLoading('root', true);
    const res = await ui.makeRequest('patch', 'winch', { winchId, parkId, ...req });
    ui.setLoading('root', false);

    if (!res) return;

    // eslint-disable-next-line max-len
    const updatedWinch = user.activePark.winches.map((winch) => {
      const up = { ...winch, ...req, techParams: { ...winch.techParams, ...req.techParams } };
      return (winch._id === winchId ? up : winch);
    });
    // eslint-disable-next-line max-len
    const updatedParks = user.parks.map((park) => (park._id === parkId ? { ...park, winches: updatedWinch } : park));

    user.setParks(updatedParks);

    ui.enqueueSnackbar({
      message: res.message,
      options: { variant: 'success' },
    });

    onClose(true);
    onEstablished(res.data._id);
  };

  const remove = async () => {
    const parkId = user.activePark._id;
    const { _id: winchId } = state;

    ui.setLoading('root', true);
    const res = await ui.makeRequest('delete', 'winch', { winchId, parkId });
    ui.setLoading('root', false);

    const updatedParks = user.parks
      .map((park) => (
        park._id === parkId
          ? { ...park, winches: park.winches.filter(({ _id }) => _id !== winchId) }
          : park
      ));

    user.setParks(updatedParks);

    ui.enqueueSnackbar({
      message: res.message,
      options: { variant: 'success' },
    });

    onClose(true);
    onEstablished(res.data._id);
  };

  const beforeRemove = () => {
    ui.showModal({
      title: 'The winch will be removed permanently.',
      subTitle: 'you will not be able to recover the winch. Are you sure you want to remove it?',
      cancelBtnTitle: 'Leave',
      confirmBtnTitle: 'Remove',
      onClose: () => remove(),
    });
  };

  const create = async (event) => {
    event.preventDefault();
    const { name, description, height, length, manufacturer } = state;
    const parkId = user.activePark._id;
    const req = {
      parkId,
      name,
      description,
      techParams: { height, length, manufacturer },
    };

    ui.setLoading('root', true);
    const res = await ui.makeRequest('post', 'winch', req);
    ui.setLoading('root', false);

    if (!res) return;

    user.setParks(user.parks.map((park) => (
      park._id === parkId ? { ...park, winches: [...park.winches, res.data] } : park)));

    ui.enqueueSnackbar({
      message: res.message,
      options: { variant: 'success' },
    });

    onClose(true);
    onEstablished(res.data._id);
  };

  const openFormCreate = () => {
    setCreated(true);

    const initValue = {
      name: '',
      description: '',
      height: 0,
      length: 0,
      manufacturer: '',
    };

    setState(initValue);
    setDefaultValue(initValue);

    onClose(false);
  };

  const openForm = (_id) => {
    const winch = user.activePark.winches.find((w) => w._id === _id);

    const initValue = {
      _id,
      name: winch.name,
      description: winch.description,
      height: winch.techParams.height,
      length: winch.techParams.length,
      manufacturer: winch.techParams.manufacturer,
    };

    setCreated(false);
    setState(initValue);
    setDefaultValue(initValue);

    onClose(false);
  };

  return (
    <Grid container direction='column' className='loader'>
      { close && user.activePark?.winches.map((winch) => (
        <LineBlock
          key={winch._id}
          onClick={() => openForm(winch._id)}
          winch={winch}
          attention={winch._id === newlyEstablished}
        />
      ))}
      { !close && (
        <Form
          title='winch'
          remove={beforeRemove}
          created={created}
          valid={valid}
          onClose={onClose}
          submit={(e) => (created ? create(e) : update(e))}
        >
          <WinchForm
            value={state}
            onChange={onChange}
          />
        </Form>
      )}

      { close && (
        <>
          <Divider />
          <Grid item style={{ width: 'calc(100% - 2em)', margin: '0.5em 1em' }}>
            <Button onClick={openFormCreate}>
              <AddIcon />
              Add Winch
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default inject('rootStore')(observer(Winch));
