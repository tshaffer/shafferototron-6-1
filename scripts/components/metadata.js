/**
 * Created by tedshaffer on 4/20/16.
 */
import React, { Component } from 'react';

class Metadata extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        console.log("metadata componentDidMount invoked");
    }

    render () {

        this.selectedPhotoTitle = "none";
        this.selectedPhotoWidth = "";
        this.selectedPhotoHeight = "";
        this.selectedPhotoDateTaken = "";
        if (this.props.selectedPhoto != null) {

            let selectedPhoto = this.props.selectedPhoto;
            this.selectedPhotoTitle = selectedPhoto.title;
            this.selectedPhotoWidth = selectedPhoto.width;
            this.selectedPhotoHeight = selectedPhoto.height;

            let dt = new Date(selectedPhoto.dateTaken);
            this.selectedPhotoDateTaken = dt.toString("M/d/yyyy hh:mm tt");
        }

        return (
            <div>
                <h4>Metadata</h4>

                <div className="photoMetadata">

                    <div>
                        <span className="leftColumn smallFont">Name:</span>
                        <span className="rightColumn smallFont">{this.selectedPhotoTitle}</span>
                    </div>

                    <div>
                        <span className="leftColumn smallFont">Dimensions:</span>
                        <span className="rightColumn smallFont">{this.selectedPhotoWidth}x{this.selectedPhotoHeight}</span>
                    </div>

                    <div>
                        <span className="leftColumn smallFont">Date taken:</span>
                        <span className="rightColumn smallFont">{this.selectedPhotoDateTaken}</span>
                    </div>
                </div>

            </div>
        );
    }
}

export default Metadata;
