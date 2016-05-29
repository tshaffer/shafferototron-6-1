/**
 * Created by tedshaffer on 5/28/16.
 */
import React, { Component } from 'react';

class Navigator extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log("navigator componentWillMount invoked");
    }

    componentDidMount() {
        console.log("navigator componentDidMount invoked");
    }

    render() {

        return (
            <div>
                <div>herro</div>
            </div>
        );
    }

}

export default Navigator;
