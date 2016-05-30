/**
 * Created by tedshaffer on 5/29/16.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

const Greeting = () => {
    return <div>Herro</div>;
}
export default (
    <Route path="/" component={App}>
        <Route path="/herro" component={Greeting}/>
    </Route>
);

