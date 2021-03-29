import React, { useState } from 'react';
import { Autocomplete, Checkbox, TextArea } from '@components/ui';
import { http } from '@libs/http';
import { replaceEmoji } from '@utils';
import { ReadyToGo } from './ready-to-go';
import { VariationsLabel } from './variations-label';
import { SendButton } from './send-button';

export const InternalIEC = (data) => {
  const [state, setState] = useState({
    iecLabels: data.iecLabels || [],
    plaVariationsToUpload: data.plaVariationsToUpload || [],
    variationsToUpload: data.variationsToUpload || [],
    variationsLabels: data.variationsLabels || [],
    comment: '',
    isApproved: null,
  });

  const hendleOnSubmit = async (e) => {
    e.preventDefault();

    data.setLoading(true);
    // internal-iec
    const response = await http.post('creatives/', {
      action: 'internal-iec',
      id: data.id,
      approver: data.approver,
      comment: replaceEmoji(state.comment),
      isApproved: state.isApproved,
      variations: state.variationsToUpload,
      plaVariations: state.plaVariationsToUpload,
      variationsLabels: state.variationsLabels,
    });

    data.setState(response === 'OK' ? 'thanks' : 'error');
    data.setLoading(false);
  };

  const { defaultCreativeLabels } = state.variationsLabels;

  const onChange = (path) => (newValue) => {
    setState({ ...state, [path]: newValue });
  };

  const onChangeToUpload = (path) => (name) => (selected) => {
    const update = state[path].map(
      (item) => (item.name === name ? { ...item, selected } : item),
    );

    onChange(path)(update);
  };

  const onChangeLabel = (name) => (value) => {
    const update = { ...state.variationsLabels, [name]: value };

    onChange('variationsLabels')(update);
  };

  return (
    <form onSubmit={hendleOnSubmit}>
      <ReadyToGo onChange={onChange('isApproved')} />
      <Autocomplete
        label='Default label list'
        multiple
        value={defaultCreativeLabels}
        options={state.iecLabels}
        optionLabel='id'
        disabled={false}
        onChange={onChangeLabel('defaultCreativeLabels')}
      />

      <div>
        <h4>IEC Variations To Upload</h4>
        <ul>
          {
            state.variationsToUpload.map(({ name, selected }, i) => (
              <li key={name}>
                <Checkbox
                  checked={selected}
                  onChange={onChangeToUpload('variationsToUpload')(name)}
                  label={name}
                />
                <VariationsLabel
                  label={`${name} labels`}
                  options={state.iecLabels.filter((item) => !defaultCreativeLabels.includes(item))}
                  selectedOption={state.variationsLabels[`variation${i + 1}`]}
                  onChange={onChangeLabel(`variation${i + 1}`)}
                />
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <h4>ECP Variations To Upload</h4>
        <ul>
          {
            state.plaVariationsToUpload.map(({ name, selected }) => (
              <li key={name}>
                <Checkbox
                  checked={selected}
                  onChange={onChangeToUpload('plaVariationsToUpload')(name)}
                  label={name}
                />
              </li>
            ))
          }
        </ul>
      </div>
      <TextArea onChange={onChange('comment')} />
      <SendButton disabled={state.isApproved === null} />
    </form>
  );
};
