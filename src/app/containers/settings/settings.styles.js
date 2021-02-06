import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 600,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,

    '& .MuiTab-wrapper': {
      justifyContent: 'flex-start',
      flexDirection: 'initial',
    },
  },
  tabContent: {
    display: 'flex',
    flexGrow: 1,
    padding: 20,
    position: 'relative',
    overflow: 'auto',

    '& > div:not(:empty)': {
      width: '100%',
    },

    '& .MuiAutocomplete-root': {
      marginBottom: 15,
    },
  },
}));
