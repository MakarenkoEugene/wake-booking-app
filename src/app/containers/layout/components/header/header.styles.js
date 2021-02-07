import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#0c168b',

    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  logo: {
    marginRight: 20,

    '& > a': {
      display: 'flex',
    },
  },

  menu: {
    flexGrow: 1,

    '& > * + *': {
      marginLeft: theme.spacing(2),
    },

    '& a.active button': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
}));
