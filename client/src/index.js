import React from "react";
import ReactDOM from 'react-dom/client';
import App from './app/App.jsx';
import { store, persistor } from './app/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainLoader from './components/mainLoader/MainLoader.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={store} >
        <PersistGate loading={<MainLoader />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);


