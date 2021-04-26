import React from 'react';
import { Grid } from '@material-ui/core';
import { Input, Autocomplete } from '@components/ui';
import { GMap } from '../map/map';

export const ParkForm = ({ defaultValue, options, value, onChange }) => (
  <>
    <Grid style={{ paddingRight: 20 }} item container sm={5} direction='column' wrap='nowrap' spacing={3} justify='flex-start'>
      <Grid item>
        <Input
          name='park-name'
          id='input-park-name'
          label='Name'
          value={value.name}
          placeholder='This is the name of your wake park, used to search'
          onChange={onChange('name')}
          required
        />
      </Grid>
      <Grid item>
        <Input
          name='park-phone'
          id='input-park-phone'
          label='Phone'
          type='phone'
          value={value.phone}
          onChange={onChange('phone')}
          required
          placeholder='380 44 555-66-77'
        />
      </Grid>

      <Grid item>
        <Autocomplete
          name='language'
          id='input-language-id'
          label='Language'
          placeholder='Choose language, it will define the default language for the app'
          required
          value={value.language}
          optionLabel='title'
          options={options.lenguage}
          onChange={onChange('language')}
        />
      </Grid>

      <Grid item>
        <Autocomplete
          name='currency'
          id='input-currency-id'
          label='Currency'
          placeholder='Select the currency in which the price will be displayed and the payment is made'
          required
          value={value.currency}
          optionLabel={(option) => (`${option.ISOCode} - ${option.name}`)}
          options={options.currency}
          onChange={onChange('currency')}
        />
      </Grid>

      <Grid item>
        <Input
          name='park-title'
          id='input-park-title'
          value={value.title}
          label='Title'
          onChange={onChange('title')}
          placeholder='More extended name of the park'
        />
      </Grid>

      <Grid item>
        <Input
          multiline
          rows={10}
          name='park-description'
          value={value.description}
          id='input-park-description'
          onChange={onChange('description')}
          label='Description'
          placeholder='Here you can specify additional information that your clients need to see'
        />
      </Grid>
    </Grid>

    <Grid sm={7} item>
      <GMap onChange={onChange('location')} value={value.location} defaultValue={defaultValue.location} />
    </Grid>
  </>
);
