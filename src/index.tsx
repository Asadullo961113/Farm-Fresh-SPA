import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './app/material/MaterialTheme';
import './css/index.css';
import {BrowserRouter as Router} from "react-router-dom";
import ContextProvider from './app/context/ContextProvider';
import { CategoryProvider } from './app/context/CategoryContext';
import { SocketProvider } from './app/context/SocketContext';

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
 
  <React.StrictMode>
    <CategoryProvider>
    <Provider store={store}>
      <SocketProvider>
      <ContextProvider>
  
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App/>
          </Router>
        </ThemeProvider>
        
      </ContextProvider>
      </SocketProvider>
    </Provider>
  </CategoryProvider>
  </React.StrictMode>
 
);

reportWebVitals();
 