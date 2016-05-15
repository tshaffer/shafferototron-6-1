import React from 'react';
import {Component} from 'react';

import Photos from '../containers/photos';

export default class App extends Component {
    render() {
        return (
            <div className = "container shafferotoContainer">
                <Photos />
            </div>
        );
    }
}
