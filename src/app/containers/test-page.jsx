/* eslint-disable */
import React from 'react';
import { inject, observer } from 'mobx-react';

const Test = ({ rootStore }) => {
  return (
    <>
      test page
    </>
  );
}

export default inject('rootStore')(observer(Test));
