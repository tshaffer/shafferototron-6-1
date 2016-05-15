require('../less/main.less');

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


// var App = React.createClass({
  // render: function(){
  //   return (
  //     <div className="myDiv">
  //       Hello Electron!
  //     </div>
  //   )
  // }
// const App = () => {
//   return (
//     <div className="myDiv">
//         <App />
//     </div>
//   );
// }

// ReactDOM.render(
//     <App />,
//     document.getElementById('content'));

// ReactDOM.render(
//     <Provider store={createStoreWithMiddleware(reducers)}>
//         <App />
//     </Provider>
//     , document.querySelector('.content'));

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById('content'));

// ReactDOM.render(
//     <Provider store={createStoreWithMiddleware(reducers)}>
//         <App />
//     </Provider>
//     , document.querySelector('.container'));
