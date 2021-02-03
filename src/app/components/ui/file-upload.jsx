import React from 'react';
import { Button } from './button';

export const FileUpload = (props) => {
  const onChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const reader = new FileReader();

    reader.onloadend = () => props.onChange({ file: reader.result });

    reader.readAsText(e.target.files[0]);
  };

  return (
    <Button
      variant={props.variant || 'contained'}
      color={props.color || 'primary'}
      style={{ overflow: 'hidden' }}
      {...props}
    >
      {props.children}

      <input
        type='file'
        name='file'
        onChange={onChange}
        style={{ opacity: 0, top: '-60%', width: '100%', height: '160%', position: 'absolute', cursor: 'pointer' }}
      />
    </Button>
  );
};
