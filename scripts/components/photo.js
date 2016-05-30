/**
 * Created by tedshaffer on 5/29/16.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';

class Photo extends Component {
    render () {

        const url = "http://localhost:3000/" + this.props.params.id.split("^").join("/");
        
        // didn't work - only worked when div dimensions set via CSS
        // const ww = window.innerWidth;
        // const wh = window.innerHeight;
        // <div width={ww} height={wh}>

        return (
            <div className="fullSizeDiv">
                <Link to="/" id="backFromPhotoButton">Back</Link>
                <img className="fullSizeImg" src={url}/>
            </div>
        );
    }
}

export default Photo;