import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => {
  console.log(theme);
  return ({
    wrapper: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      left: '0px',
      bottom: '0px',
    },
    auth: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      minWidth: '320px',
      width: '100%',
      borderRadius: '12px',
      maxWidth: '600px',
    },
    form: {
      padding: '60px 30px 30px',
    },
  });
});
