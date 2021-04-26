import React from 'react';
import { Provider } from 'mobx-react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

const themeType = window.localStorage.getItem('theme');

const theme = createMuiTheme({
  palette: {
    type: themeType || 'dark',
    primary: {
      main: '#0381cb', // #0381cb , #15be8f
    },
    secondary: {
      main: themeType === 'light' ? '#fff' : '#000',
    },
  },
  typography: {
    htmlFontSize: 17,
  },
});

class App extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log(error, errorInfo);
  }

  render() {
    const { store, routes } = this.props;

    return (
      <Provider rootStore={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <Router>{routes}</Router>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default hot(module)(App);
