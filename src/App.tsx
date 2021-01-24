import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp/index';

import AppProvider from './hooks/index';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>

    {/* <ToastContainer /> */}
    <GlobalStyle />
  </>
);

export default App;
