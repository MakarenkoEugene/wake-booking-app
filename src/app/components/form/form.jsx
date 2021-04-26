import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { Button } from '@components/ui';

import AddIcon from '@material-ui/icons/Add';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const Form = ({ title, valid, submit, onClose, created, remove, children }) => (
  <Grid item>
    <form style={{ width: '100%' }} onSubmit={submit}>
      <Grid item container direction='column' wrap='nowrap'>

        <Grid style={{ padding: 20 }} item container direction='row' justify='space-between'>
          <Button
            variant='outlined'
            style={{ marginRight: 25 }}
            onClick={() => onClose(true)}
          >
            <KeyboardBackspaceIcon />
            Go Back
          </Button>

          <Typography variant='body1' style={{ textTransform: 'uppercase' }} color='primary'>
            { created ? `Сreation of ${title}` : `Change ${title} setting` }
          </Typography>

        </Grid>

        <Divider />

        <Grid style={{ padding: 20 }} item container direction='row' justify='flex-start'>
          {children}
        </Grid>

        <Grid container justify='space-between' style={{ padding: 20 }} item>
          <Button
            disabled={Object.values(valid).some((fieldValid) => !fieldValid)}
            type='submit'
          >
            { created ? (<><AddIcon /> Create</>) : 'Update' }
          </Button>

          { remove && !created && (
            <Button
              onClick={remove}
              type='button'
              color='default'
              variant='outlined'
              style={{ color: 'gray' }}
            >
              <DeleteForeverIcon />
              {`Remove ${title}`}
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  </Grid>
);
