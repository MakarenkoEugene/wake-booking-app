import React from 'react';
import { Grid, Typography, Slider, Divider } from '@material-ui/core';
import { Input, RadioGroup } from '@components/ui';

// _id: String, // required unique
//   name:type: String, // required
//   description: String, // default ""
//   price: Number, // required; should be a positive integer
//   quantity: Number, // number of uses; required; should be a positive integer
//   refersTo: String, // id of teacher/park required

//   availableDate: String, // one of weekend/weekday/holiday; required
//   availableTime: [String], // format 'HH:MM' 08:10 // default []

export const SubscriptionsForm = ({ value, onChange, options }) => (
  <>
    <Grid sm={6} style={{ paddingRight: 20 }} item container direction='column' wrap='nowrap' spacing={3} justify='flex-start'>
      <Grid item>
        <Input
          name='subscription-name'
          id='input-subscription-name'
          label='Name'
          value={value.name}
          placeholder='This is the name of your subscription, used to search'
          onChange={onChange('name')}
          required
        />
      </Grid>

      <Grid item>
        <Input
          name='subscription-price'
          id='input-subscription-price'
          label='Price'
          required
          type='number'
          inputProps={{ min: 0 }}
          value={value.price}
          onChange={onChange('price')}
          placeholder='The use price of subscription, currency is taken from the park settings'
        />
      </Grid>
      <Grid item>
        <Input
          name='subscription-quantity'
          id='input-subscription-quantity'
          label='Quantity'
          required
          type='number'
          inputProps={{ min: 0 }}
          value={value.quantity}
          onChange={onChange('quantity')}
          placeholder='Number of uses'
        />
      </Grid>
      <Grid item>
        <Input
          multiline
          rows={8}
          name='subscription-description'
          value={value.description}
          id='input-subscription-description'
          onChange={onChange('description')}
          label='Description'
          placeholder='Here you can specify additional information that your clients need to see'
        />
      </Grid>
    </Grid>
    <Grid sm={6} style={{ paddingRight: 20 }} item container direction='column' wrap='nowrap' spacing={3} justify='flex-start'>
      <Grid item>
        <RadioGroup
          required
          name='subscription-availableDate'
          id='input-subscription-availableDate'
          label='Available date type for use:'
          options={options.availableDate}
          value={value.availableDate}
          onChange={onChange('availableDate')}
        />
      </Grid>

      <Divider />

      <Grid container direction='column' item>
        <Typography id='discrete-slider-small-steps' variant='subtitle1' gutterBottom>
          Time range of use:
        </Typography>
        <Slider
          style={{ margin: '30px 17px', width: 'calc(100% - 34px)' }}
          defaultValue={[0, 288]}
          valueLabelFormat={(v) => {
            if (v === 288) return '23:59';
            const h = Math.floor(v / 12);
            const m = (v % 12) * 5;

            return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}`;
          }}
          marks={[
            { label: '00:00', value: 0 },
            { label: '03:00', value: 36 },
            { label: '06:00', value: 72 },
            { label: '09:00', value: 108 },
            { label: '12:00', value: 144 },
            { label: '15:00', value: 180 },
            { label: '18:00', value: 216 },
            { label: '21:00', value: 252 },
            { label: '23:59', value: 288 },
          ]}
          aria-labelledby='discrete-slider-small-steps'
          step={1}
          min={0}
          max={288}
          valueLabelDisplay='auto'
        />
        <Typography id='discrete-slider-small-steps' variant='caption' style={{ textAlign: 'end' }} gutterBottom>
          If there deals in this time interval, the subscription can pay for them.
        </Typography>
      </Grid>

      <Divider />
    </Grid>
  </>
);
