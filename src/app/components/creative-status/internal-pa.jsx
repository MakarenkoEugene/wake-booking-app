import React, { useState } from 'react';
import { Autocomplete } from '@components/ui';
import { http } from '@libs/http';
import { VariationsLabel } from './variations-label';
import { SendButton } from './send-button';

export const InternalPA = ({ id, ...data }) => {
  const [state, setState] = useState(data.variationsLabels || {});

  const { defaultCreativeLabels, ...variationsLabels } = state;

  const onChange = (path) => (value) => {
    setState({ ...state, [path]: value });
  };

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    data.setLoading(true);

    try {
      // internal-pa
      await http.post('creatives/', {
        action: 'internal-pa',
        id,
        variationsLabels: state,
      });

      setState('thanks');
    } catch (error) {
      setState('error');
    } finally {
      data.setLoading(false);
    }
  };

  return (
    <form onSubmit={hendleOnSubmit} style={{ minWidth: '300px' }}>
      <Autocomplete
        label='Default label list'
        multiple
        value={defaultCreativeLabels}
        options={data.iecLabels}
        optionLabel='id'
        onChange={onChange('defaultCreativeLabels')}
      />

      <div>
        <ul>
          {
            Object.entries(variationsLabels).map(([key, value]) => {
              if (!value || !value.name || !value.labels) return null;

              return (
                <li key={key}>
                  <VariationsLabel
                    withOpen={false}
                    options={data.iecLabels.filter((item) => !defaultCreativeLabels.includes(item))}
                    selectedOption={value}
                    onChange={onChange(key)}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
      <SendButton />
    </form>
  );
};
