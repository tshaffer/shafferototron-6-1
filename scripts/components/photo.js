/**
 * Created by tedshaffer on 5/29/16.
 */
import React, {Component} from 'react';

class Photo extends Component {
    render () {
        return <div>Show photo {this.props.params.id}</div>
    }
}

export default Photo;