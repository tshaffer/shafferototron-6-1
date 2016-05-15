require('../less/main.less');

'use strict';

// var React = require('react');
// var ReactDOM = require('react-dom');
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import App from '../javascripts/components/app';

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

ReactDOM.render(
    <App />,
    document.getElementById('content'));
