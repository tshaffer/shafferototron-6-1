/**
 * Created by tedshaffer on 5/29/16.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';

class Photo extends Component {
    render () {

        const photoSpec = this.props.params.id.split("|");

        const url = "http://localhost:3000/" + photoSpec[0].split("^").join("/");

        const orientationSpec = photoSpec[1];
        const orientationValue = orientationSpec.substr(1);

        // didn't work - only worked when div dimensions set via CSS
        // const ww = window.innerWidth;
        // const wh = window.innerHeight;
        // <div width={ww} height={wh}>

        let className = "fullSizeImg";
        if (orientationValue == 6) {
            className += " rotateImg";
        }

        return (
            <div className="fullSizeDiv">
                <Link to="/" id="backFromPhotoButton">Back</Link>
                <img className={className} src={url}/>
            </div>
        );
    }
}

export default Photo;