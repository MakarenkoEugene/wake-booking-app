import React, { useEffect, useRef } from 'react';
import { Grid, Typography, Paper, Divider } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { StaticGMap } from './map/map';

const useStyles = makeStyles((theme) => ({
  lineBlock: {
    padding: 5,
    cursor: 'pointer',
    transition: `${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn}`,

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  '@keyframes myEffect': {
    '0%': {
      backgroundColor: theme.palette.background.paper,
    },
    '100%': {
      backgroundColor: `${theme.palette.success.main}`,
    },
  },
  greenAlert: {
    backgroundColor: theme.palette.success.main,
    animation: `$myEffect 0.6s ${theme.transitions.easing.easeIn} 1 alternate`,

    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
  },
}));

export const LineBlock = ({ winch, park, onClick, attention, equip }) => {
  const classes = useStyles();
  const fieldRef = useRef(null);

  useEffect(() => {
    if (attention && fieldRef.current) {
      fieldRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [attention]);

  return (
    <Grid item style={{ width: 'calc(100% - 2em)', margin: '0.5em 1em' }}>
      <Paper ref={fieldRef} onClick={onClick} variant='outlined' className={clsx(classes.lineBlock, attention && classes.greenAlert)}>
        { park && (
        <Grid style={{ width: '100%', height: '200px' }} container direction='row' wrap='nowrap' justify='space-between'>
          <Grid item style={{ width: '60%', marginRight: '10px', overflow: 'hidden' }}>

            <Typography variant='h4'>{park.name}</Typography>
            <Divider />

            <Grid
              container
              direction='row'
              wrap='nowrap'
              justify='space-between'
            >
              <Typography variant='h5'>{park.title}</Typography>

              <Typography variant='subtitle1'>CONTACT NUMBER: {park.phone}</Typography>
              { park.currency?.ISOCode && (<Typography variant='subtitle1'>CURRENCY: {park.currency.ISOCode}</Typography>)}
            </Grid>
            <Divider />

            <Typography style={{ whiteSpace: 'break-spaces' }} variant='body2'>{park.description}</Typography>
          </Grid>

          <Grid style={{ width: '40%' }} item>
            <StaticGMap location={park.location} width='1200' height='600' />
          </Grid>
        </Grid>
        )}
        { winch && (
          <Grid container direction='row' wrap='nowrap' justify='space-between'>
            <Grid direction='column' item container>
              <Typography variant='h5'>{winch.name}</Typography>

              <Typography style={{ whiteSpace: 'break-spaces' }} variant='body2'>{winch.description}</Typography>
            </Grid>

            <Grid
              item
              container
              direction='column'
              wrap='nowrap'
              alignItems='flex-end'
              style={{ width: 'auto', minWidth: '180px' }}
            >
              {winch.techParams.height && (
                <>
                  <Grid direction='row' justify='space-between' wrap='nowrap' item container>
                    <Typography variant='body1'>Height:</Typography>
                    <Typography variant='body1'>{winch.techParams.height} mt</Typography>
                  </Grid>
                  <Divider style={{ width: '100%' }} />
                </>
              )}
              {winch.techParams.length && (
                <>
                  <Grid direction='row' justify='space-between' wrap='nowrap' item container>
                    <Typography variant='body1'>Length:</Typography>
                    <Typography variant='body1'>{winch.techParams.length} mt</Typography>
                  </Grid>
                  <Divider style={{ width: '100%' }} />
                </>
              )}
              {winch.techParams.manufacturer && (
                <Grid direction='row' justify='space-between' wrap='nowrap' item container>
                  <Typography variant='body1'>Manufacturer:</Typography>
                  <Typography variant='body1'>{winch.techParams.manufacturer}</Typography>
                </Grid>
              )}
            </Grid>

          </Grid>
        ) }
        { equip && (
          <Grid container direction='row' wrap='nowrap' justify='space-between'>
            <Grid direction='column' item container>
              <Typography variant='h5'>{equip.name}</Typography>

              <Typography style={{ whiteSpace: 'break-spaces' }} variant='body2'>{equip.description}</Typography>
            </Grid>

            <Grid
              item
              container
              direction='column'
              wrap='nowrap'
              alignItems='flex-end'
              style={{ width: 'auto', minWidth: '150px' }}
            >
              <Grid direction='row' justify='space-between' wrap='nowrap' item container>
                <Typography variant='body1'>Price:</Typography>
                <Typography variant='body1'>{equip.price}{equip.currency?.S}</Typography>
                { equip.currency.ISOCode && (<Typography variant='subtitle2'>{equip.currency.ISOCode}</Typography>)}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
};
