import React from 'react';
import { useLocation } from 'react-router-dom';
import { inject } from 'mobx-react';
import { Typography } from '@material-ui/core';

const Home = ({ rootStore: { ui } }) => {
  const q = new URLSearchParams(useLocation().search);

  if (q.has('error')) {
    ui.showAlert({
      type: 'error',
      msg: 'Komodo does not allow you to use this system :(',
      delay: 6000,
    });
  }

  return (
    <div>
      <Typography variant='h3' color='textPrimary'>Welcome</Typography>
      <Typography variant='body1' color='textPrimary'>
        { new Array(50).fill(0)
          .map(() => `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sunt suscipit, ipsa fuga modi numquam maxime. Beatae corrupti facere ea.
            Illo quisquam sequi sunt cupiditate blanditiis commodi, maiores totam explicabo ea.`).join('\n')}
      </Typography>
    </div>
  );
};

export default inject('rootStore')(Home);
