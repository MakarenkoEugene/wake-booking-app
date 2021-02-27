import React, { useState, useEffect } from 'react';

export const TextArea = ({ onChange, ...props }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value]);

  const addEmoji = (emoji) => () => {
    setValue(value + emoji);
  };

  const hendleOnChange = (e) => {
    e.preventDefault();

    setValue(e.target.value);
  };

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
  /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
  return (
    <div style={{ padding: '0px', width: '100%', borderBlock: '1px solid #c1c0c0', borderTop: '1px solid #c1c0c0', backgroundColor: 'white' }}>
      <textarea
        value={value}
        style={{ resize: 'none', outline: 'none', minHeight: '10em', fontSize: '1.1em', color: '#0210A1', padding: '1em', width: 'calc(100% - 2em)', height: '100%', border: 'none' }}
        onChange={hendleOnChange}
        {...props}
      />
      <ul style={{ listStyle: 'none', display: 'flex', fontSize: '1.6em', padding: '0.5em', width: 'auto', margin: 'auto' }}>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('🙂')} tabIndex={0}>🙂</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('😞')} tabIndex={0}>😞</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('😛')} tabIndex={0}>😛</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('😃')} tabIndex={0}>😃</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('😉')} tabIndex={0}>😉</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('👍')} tabIndex={0}>👍</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('👎')} tabIndex={0}>👎</li>
        <li style={{ cursor: 'pointer', margin: '0px 0.3em' }} onClick={addEmoji('💡')} tabIndex={0}>💡</li>
      </ul>
    </div>
  );
};
