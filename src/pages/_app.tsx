import React, { Context } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Router } from 'next/dist/client/router';
import theme from '~/theme';
import { Provider } from 'react-redux';
import { initializeStore, useStore } from '~/store/store';
import axios from 'axios';
import { vehiclesUrl } from '~/config';

import { GET_ALL_CARS } from '~/store/types';
import App from 'next/app';

import 'styles/globals.scss';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.remove();
});

function MyApp(props: any) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (context: any) => {
  const reduxStore = await initializeStore({});
  const { dispatch } = reduxStore;

  const res = await axios.get(vehiclesUrl);
  const cars = res.data;

  await dispatch({
    type: GET_ALL_CARS,
    payload: cars,
  });
  console.log(cars, 'in the _app');

  return {
    ...(await App.getInitialProps(context)),
    props: { initialReduxState: reduxStore.getState() },
  };
};

export default MyApp;
