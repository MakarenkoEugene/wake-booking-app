import React, { useEffect, useState } from 'react';
import { inject } from 'mobx-react';
import { Button } from '@components/ui';
import { Loading } from '@components/loading/loading';
import { http } from '@libs/http';
import './mailer.scss';

const Mailer = ({ rootStore: { ui } }) => {
  const [state, setState] = useState({ loading: false });

  const preview = async () => {
    setState({ ...state, loading: true });

    const content = await http.get('api/mailer');

    setState({ content });
  };

  const sendMail = async () => {
    setState({ ...state, loading: true });

    await http.post('api/mailer', { html: state.content });

    setState({ ...state, loading: false });

    ui.showAlert({
      type: 'success',
      msg: 'Sent!',
      delay: 3000,
    });
  };

  useEffect(preview, []);

  if (state.loading) return <Loading />;

  return (
    <div className='mailer'>
      <Button onClick={preview} color='inherit'>Refresh</Button>
      <Button onClick={sendMail} color='primary'>Send</Button>

      <iframe srcDoc={state.content} />
    </div>
  );
};

export default inject('rootStore')(Mailer);
