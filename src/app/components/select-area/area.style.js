import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cell: {
    width: (v) => `${v - 2}px`,
    height: (v) => `${v - 2}px`,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
    margin: '1px',
    userSelect: 'none',
    border: '2px solid transparent',
  },
  passed: {
    backgroundColor: theme.palette.background.default,
    border: `4px solid ${theme.palette.background.default}`,
  },
  selected: {
    borderColor: theme.palette.text.primary,
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
  select: {
    zIndex: 9000,
    position: 'absolute',
    border: '1px solid blue',
    backgroundColor: 'lightBlue',
    opacity: 0.5,
  },
  area: {
    position: 'relative',
    width: 'min-content',
  },
}));
