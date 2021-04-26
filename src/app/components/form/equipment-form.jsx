import React from 'react';
import { Grid } from '@material-ui/core';
import { Input } from '@components/ui';

export const EquipmentForm = ({ value, onChange }) => (
  <>
    <Grid sm={6} style={{ paddingRight: 20 }} item container direction='column' wrap='nowrap' spacing={3} justify='flex-start'>
      <Grid item>
        <Input
          name='equipment-name'
          id='input-equipment-name'
          label='Name'
          value={value.name}
          placeholder='This is the name of your equipment, used to search'
          onChange={onChange('name')}
          required
        />
      </Grid>

      <Grid item>
        <Input
          multiline
          rows={10}
          name='equipment-description'
          value={value.description}
          id='input-equipment-description'
          onChange={onChange('description')}
          label='Description'
          placeholder='Here you can specify additional information that your clients need to see'
        />
      </Grid>

      <Grid item>
        <Input
          name='equipment-price'
          id='input-park-price'
          label='Price'
          type='number'
          inputProps={{ min: 0 }}
          value={value.price}
          onChange={onChange('price')}
          placeholder='The use price of equipment, currency is taken from the park settings'
        />
      </Grid>
    </Grid>
  </>
);
