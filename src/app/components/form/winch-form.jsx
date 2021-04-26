import React from 'react';
import { Grid } from '@material-ui/core';
import { Input } from '@components/ui';

export const WinchForm = ({ value, onChange }) => (
  <>
    <Grid style={{ paddingRight: 20 }} item container direction='column' wrap='nowrap' spacing={3} justify='flex-start'>
      <Grid item>
        <Input
          name='winch-name'
          id='input-winch-name'
          label='Name'
          value={value.name}
          placeholder='This is the name of your winch, used to search'
          onChange={onChange('name')}
          required
        />
      </Grid>

      <Grid item>
        <Input
          multiline
          rows={10}
          name='winch-description'
          value={value.description}
          id='input-winch-description'
          onChange={onChange('description')}
          label='Description'
          placeholder='Here you can specify additional information that your clients need to see'
        />
      </Grid>
    </Grid>

    <Grid item container direction='column' wrap='nowrap' spacing={3} justify='flex-start'>
      <Grid item>
        <Input
          name='winch-manufacturer'
          id='input-manufacturer'
          value={value.manufacturer}
          label='Manufacturer'
          onChange={onChange('manufacturer')}
          placeholder='Manufacturer of your winch'
        />
      </Grid>

      <Grid item>
        <Input
          name='winch-height'
          id='input-park-height'
          label='Height'
          type='number'
          inputProps={{ min: 0, max: 25 }}
          value={value.height}
          onChange={onChange('height')}
          placeholder='Height of your winch, in meters'
        />
      </Grid>

      <Grid item>
        <Input
          name='winch-length'
          id='input-park-length'
          label='Length'
          type='number'
          inputProps={{ min: 0, max: 1000 }}
          value={value.length}
          onChange={onChange('length')}
          placeholder='Length of your winch, in meters'
        />
      </Grid>
    </Grid>
  </>
);
