import React from 'react';
import moment from 'moment';
import { inject, observer } from 'mobx-react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { SelectArea } from '@components';

import uuid from 'react-uuid';
import clsx from 'clsx';
import useStyle from './schedule.styles';

const cellSize = 27;

// calendarDate={calendarDate}
//         schedule={schedule}
//         selected={selected}
//         dateArray={dateArray}
//         daysInMonth={daysInMonth}
//         setSelected={setSelected}
//         locale='en'
//         utcOffset={180}

function Calendar({
  locale = 'en',
  utcOffset = 180,
  rootStore: { schedule },
  increaseCalendarDate,
  decreaseCalendarDate,
}) {
  const classes = useStyle(cellSize);
  const nowDate = moment(new Date()).utcOffset(utcOffset).format('YYYY-MM-DD HH');

  return (
    <Grid item container className={classes.calendarWrapper}>
      <Grid item container direction='row' justify='space-between'>
        <IconButton onClick={decreaseCalendarDate}>
          <ChevronLeft />
        </IconButton>
        <Typography variant='h6' color='textPrimary'>
          {moment(schedule.calendarDate).locale(locale).utcOffset(utcOffset).format('MMMM YYYY')}
        </Typography>
        <IconButton onClick={increaseCalendarDate}>
          <ChevronRight />
        </IconButton>
      </Grid>

      <Grid container className={classes.calendar}>
        <Grid container item direction='row' className={clsx(classes.listDate)}>
          {schedule.dateArray.map((date) => (
            <Grid key={uuid()} item className={clsx(classes.cell, classes.cellDate)}>
              <Typography variant='caption' color='textPrimary'>{date.format('DD')}</Typography>
              <br />
              <Typography variant='caption' color='textPrimary'>{date.format('dd')}</Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container direction='row' wrap='nowrap'>
          <Grid key={uuid()} container item direction='column' className={clsx(classes.listTime)}>
            {new Array(24).fill('').map((v, i) => (
              <Grid item key={uuid()} className={clsx(classes.cell, classes.cellTime)}>
                <Typography variant='caption' color='textPrimary'>{`${i < 10 ? `0${i}` : i}:00`}</Typography>
              </Grid>
            ))}
            <Grid item className={clsx(classes.cell, classes.cellTime)}>
              <Typography variant='caption' color='textPrimary'>23:59</Typography>
            </Grid>
          </Grid>
          <SelectArea
            schedule={schedule.schedule}
            cellSize={cellSize}
            daysInMonth={schedule.daysInMonth}
            selected={schedule.selected}
            setSelected={schedule.setSelected}
            nowDate={
              (moment(nowDate).isSame(schedule.calendarDate, 'month') && moment(nowDate).format('DDHH'))
              || (nowDate > schedule.calendarDate && '9999')
            }
          />
          <Grid key={uuid()} container item direction='column' className={clsx(classes.listTime)}>
            {new Array(24).fill('').map((v, i) => (
              <Grid item key={uuid()} className={clsx(classes.cell, classes.cellTime)}>
                <Typography variant='caption' color='textPrimary'>{`${i < 10 ? `0${i}` : i}:00`}</Typography>
              </Grid>
            ))}
            <Grid item className={clsx(classes.cell, classes.cellTime)}>
              <Typography variant='caption' color='textPrimary'>23:59</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item direction='row' className={clsx(classes.listDate)}>
          {schedule.dateArray.map((date) => (
            <Grid key={uuid()} item className={clsx(classes.cell, classes.cellDate)}>
              <Typography variant='caption' color='textPrimary'>{date.format('DD')}</Typography>
              <br />
              <Typography variant='caption' color='textPrimary'>{date.format('dd')}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default inject('rootStore')(observer(Calendar));
