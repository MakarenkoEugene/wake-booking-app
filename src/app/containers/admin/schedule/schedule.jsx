import React, { useEffect } from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
// import { SelectableGroup, createSelectable } from 'react-selectable';
import { Grid, Typography, Paper, Button, Divider } from '@material-ui/core';
// import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import uuid from 'react-uuid';
// import clsx from 'clsx';
import Calendar from './calendar';
import useStyle from './schedule.styles';

function Schedule({ rootStore: { user, schedule } }) {
  const classes = useStyle();

  const { rootStore: r, ...res } = schedule;
  console.log(JSON.parse(JSON.stringify(res.goal)));

  const increaseCalendarDate = () => {
    const month = schedule.calendarDate.split('-')[1];
    const formatedDate = moment(schedule.calendarDate).month(month).format('YYYY-MM-DD');

    schedule.setCalendarDate(formatedDate);
  };

  const decreaseCalendarDate = () => {
    const month = Number(schedule.calendarDate.split('-')[1]) - 2;
    const formatedDate = moment(schedule.calendarDate).month(month).format('YYYY-MM-DD');

    schedule.setCalendarDate(formatedDate);
  };

  useEffect(() => {
    if (user.activePark) schedule.setGoal({ name: user.activePark.name, id: user.activePark._id });
  }, [user.activePark]);

  useEffect(() => {
    schedule.setCalendarDate(moment(new Date()).format('YYYY-MM-DD'));
  }, []);

  if (!user.activePark) return null;

  return (
    <Grid container direction='row' wrap='nowrap' alignItems='flex-start' className={classes.wrapper}>
      <Calendar
        increaseCalendarDate={increaseCalendarDate}
        decreaseCalendarDate={decreaseCalendarDate}
      />

      <Grid item container direction='column' alignItems='center' wrap='nowrap'>
        <Paper variant='outlined'>
          <Typography variant='h6' style={{ margin: '10px' }}>
            Schedule for {schedule.goal.path}: {`"${schedule.goal.name}"`}
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel1a-header'>
              <Typography className={classes.heading}>Park schedule</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography>
                    {`The park schedule is needed to tell your clients what time you will be working,
                    your clients can book a time if it is selected in your schedule.
                    The schedule is transmitted to all winches if you need to create an exception
                    for some day for one winch you can use the "Winch schedule" section`}
                  </Typography>
                </Grid>
                <Divider />
                <Grid container item justify='space-around'>
                  <Button
                    onClick={() => schedule.setGoal({
                      name: user.activePark.name,
                      id: user.activePark._id,
                    })}
                    variant='contained'
                    color={schedule.goal.id === user.activePark._id ? 'primary' : 'default'}
                  >
                    {user.activePark.name}
                  </Button>
                </Grid>
              </Grid>

            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel2a-header'>
              <Typography className={classes.heading}>Winch schedule</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography>
                    {`The default winch schedule is taken from the wake park schedule.
                    If you would like to make an exception for one of your winches,
                    you can add that exception to the winch schedule.
                    This parameter is needed to generate exceptions in the operation of one winch.`}
                  </Typography>
                </Grid>
                <Divider />
                <Grid container item justify='space-around'>
                  {user.activePark.winches.map(({ name, _id }) => (
                    <Button
                      key={_id}
                      onClick={() => schedule.setGoal({ name, id: _id })}
                      color={schedule.goal.id === _id ? 'primary' : 'default'}
                      variant='contained'
                    >
                      {name}
                    </Button>
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id='panel3a-header'>
              <Typography className={classes.heading}>Set time as</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography>
                    When you press one of the keys, the time you selected will become possible for
                    booking with this type of day.
                    The type of day required to set up payment in your park
                  </Typography>
                </Grid>
                <Divider />
                <Grid container item justify='space-around'>
                  <Button
                    disabled={!schedule.selected?.length}
                    onClick={() => schedule.setSchedule('weekday')}
                    className={classes.weekday}
                    variant='contained'
                  >
                    weekday
                  </Button>
                  <Button
                    disabled={!schedule.selected?.length}
                    onClick={() => schedule.setSchedule('weekend')}
                    className={classes.weekend}
                    variant='contained'
                  >
                    weekend
                  </Button>
                  <Button
                    disabled={!schedule.selected?.length}
                    onClick={() => schedule.setSchedule('holiday')}
                    className={classes.holiday}
                    variant='contained'
                  >
                    holiday
                  </Button>
                </Grid>
                <Divider />
                <Grid container item justify='space-around'>
                  <Typography>Remove schedule from selected days: </Typography>
                  <Button
                    disabled={!schedule.selected?.length}
                    onClick={() => schedule.setSchedule('remove')}
                    variant='contained'
                  >
                    remove
                  </Button>
                </Grid>

              </Grid>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default inject('rootStore')(observer(Schedule));
