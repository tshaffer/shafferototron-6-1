require('../less/main.less');

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, browserHistory, hashHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import { Route } from 'react-router';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

import App from './components/app';

// loads index.html properly
// <Router history={hashHistory} routes = {routes} />

// browserHistory doesn't work at all
// <Router history={browserHistory} routes = {routes} />
// <App />

// loads nested routes from routes.js - any way to load sibling routes?
// <Router history={hashHistory} routes = {routes} />

// to load sibling routes?
// <Router history={hashHistory}>
//     <Route path="/" component={App} />
//     <Route path="/herro" component={Greeting}/>
// </Router>

const Greeting = () => {
    return <div>Herro</div>
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/herro" component={Greeting}/>
        </Router>
    </Provider>
    , document.getElementById('content'));
