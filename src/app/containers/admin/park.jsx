import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Divider } from '@material-ui/core';
import { Button } from '@components/ui';
import { ParkForm, Form, LineBlock } from '@components';
import { findChanges, formValidate } from '@utils';

import AddIcon from '@material-ui/icons/Add';

const Park = ({ rootStore: { ui, user } }) => {
  const [newlyEstablished, setNewlyEstablished] = useState('');
  const [close, onClose] = useState(true);
  const [created, setCreated] = useState(true);
  const [defaultValue, setDefaultValue] = useState({});
  const [state, setState] = useState({});
  const [valid, setValid] = useState({ phone: false });
  const [validate, setValidate] = useState(() => ({}));

  useEffect(() => {
    const required = {
      all: (v) => JSON.stringify(defaultValue) !== JSON.stringify(v),
      name: (v) => v && v.trim().length > 2,
      phone: (v) => /^380[0-9]{9}$/.test(v),
      currency: (v) => user.options.currency.find(({ ISOCode }) => ISOCode === v.ISOCode),
      language: (v) => user.options.lenguage.includes(v),
      location: (v, c) => !c || JSON.stringify(user.options.defaultLocation) !== JSON.stringify(v),
    };

    setValidate(() => formValidate(required));
  }, [user.options, setValidate, defaultValue]);

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

    const { _id: parkId } = defaultValue;
    const { language, ...req } = state;

    const initData = { ...defaultValue, language: defaultValue.language.id };
    const newData = { language: language.id, ...req };

    const reqData = findChanges(newData, initData);

    ui.setLoading('root', true);
    const res = await ui.makeRequest('patch', 'park', { parkId, ...reqData });
    ui.setLoading('root', false);

    if (!res) return;

    user.setParks(user.parks.map((park) => (park._id === parkId ? { ...park, ...reqData } : park)));

    ui.enqueueSnackbar({
      message: res.message,
      options: { variant: 'success' },
    });

    onClose(true);
    onEstablished(res.data._id);
  };

  const create = async (event) => {
    event.preventDefault();
    const { language, ...req } = state;

    ui.setLoading('root', true);
    const res = await ui.makeRequest('post', 'park', { language: language.id, ...req });
    ui.setLoading('root', false);
    if (!res) return;

    user.setParks([...user.parks, res.data]);

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
      title: '',
      phone: '',
      currency: null,
      language: null,
      description: '',
      location: user.options.defaultLocation,
    };

    setState(initValue);
    setDefaultValue(initValue);

    onClose(false);
  };

  const openForm = (_id) => {
    const park = user.parks.find((p) => p._id === _id);

    const initValue = {
      _id,
      name: park.name,
      title: park.title,
      currency: park.currency || null,
      phone: park.phone,
      language: user.options.lenguage.find(({ id: languageId }) => languageId === park.language),
      description: park.description,
      location: park.location,
    };

    setCreated(false);
    setState(initValue);
    setDefaultValue(initValue);

    onClose(false);
  };

  return (
    <Grid container direction='column' className='loader'>
      { close && user.parks.map((park) => (
        <LineBlock
          key={park._id}
          onClick={() => openForm(park._id)}
          park={park}
          attention={park._id === newlyEstablished}
        />
      ))}

      { !close && (
        <Form
          title='park'
          created={created}
          valid={valid}
          onClose={onClose}
          submit={created ? create : update}
        >
          <ParkForm
            value={state}
            defaultValue={defaultValue}
            onChange={onChange}
            options={user.options}
          />
        </Form>
      )}

      { close && (
        <>
          <Divider />
          <Grid item style={{ width: 'calc(100% - 2em)', margin: '0.5em 1em' }}>
            <Button onClick={openFormCreate}>
              <AddIcon />
              Create New Park
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default inject('rootStore')(observer(Park));
