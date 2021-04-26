import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  console.log(theme);

  return {
    wrapper: {
      position: 'relative',
    },
    calendar: {
      width: 'min-content',
      position: 'relative',
      padding: '0px',
      margin: '0px',
    },
    calendarWrapper: {
      position: 'relative',
      width: 'min-content',
    },
    cell: {
      fontSize: '12px',
      textAlign: 'center',
      width: (v) => `${v - 2}px`,
      height: (v) => `${v - 2}px`,
      lineHeight: (v) => `${v - 2}px`,
      backgroundColor: theme.palette.background.default,
      margin: '1px',
      userSelect: 'none',
    },
    cellTime: {
      width: (v) => `${(v - 2) * 2}px`,
    },
    listTime: {
      marginTop: '-15px',
      width: 'auto',
    },
    cellDate: {
      height: (v) => `${(v - 2) * 2}px`,
    },
    listDate: {
      marginLeft: (v) => `${(v - 2) * 2}px`,
    },
    weekday: {
      backgroundColor: theme.palette.success.light,
    },
    weekend: {
      backgroundColor: theme.palette.warning.light,
    },
    holiday: {
      backgroundColor: theme.palette.error.light,
    },
  };
});
