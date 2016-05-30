/**
 * Created by tedshaffer on 5/1/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPhoto } from '../actions/index';
import { updateSelectedPhotos } from '../actions/index';
import { bindActionCreators } from 'redux';
import { fetchPhotos } from '../actions/index';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router, browserHistory, hashHistory } from 'react-router';

import { Link } from 'react-router';

class PhotoGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
        this.photosById = {};
        this.selectedPhotos = {};
    }

    componentWillMount() {
        console.log("photo-grid: componentWillMount invoked");
        this.props.fetchPhotos();
    }

    componentDidMount() {
        console.log("photo-grid: componentDidMount invoked");
    }

    displayFullSizePhoto(photo) {
        console.log("displayFullSizePhoto");

        const photoSpec = photo.url.split("/").join("^");
        hashHistory.push('/photo/' + photoSpec);
    }

    togglePhotoSelection(photo) {
        console.log("togglePhotoSelection");

        if (this.selectedPhotos.hasOwnProperty(photo.dbId)) {
            delete this.selectedPhotos[photo.dbId];
        }
        else {
            this.selectedPhotos[photo.dbId] = photo;
        }

        let selectedPhotos = {};

        for (var property in this.selectedPhotos) {
            if (this.selectedPhotos.hasOwnProperty(property)) {
                selectedPhotos[property] = this.selectedPhotos[property];
            }
        }

        this.props.updateSelectedPhotos(selectedPhotos);
        this.selectedPhotos = selectedPhotos;
    }

    // <Link to="/herro">

    getDayOfPhotoNodes(dayOfPhotos) {

        var self = this;

        let photosForDayNodes = dayOfPhotos.photos.map(function(photo) {

            // self.thumbUrl = "http://localhost:3000/photos/" + photo.thumbUrl.replace(" ", "%20");
            self.thumbUrl = "http://localhost:3000/" + photo.thumbUrl;
            self.photosById[photo.dbId] = photo;

            return (
                <li className="flex-item photoThumbsDiv thumbLi" key={photo.dbId}>
                        <img id={photo.dbId} src={self.thumbUrl} className="thumbImg" width={photo.width}
                             height={photo.height}
                             onClick={() => self.props.selectPhoto(photo)}
                             onDoubleClick={() => self.displayFullSizePhoto(photo)}
                        />
                    <input id={photo.dbId} type="checkbox" className="thumbSelector"
                           onClick={() => self.togglePhotoSelection(photo)}
                    >
                    </input>
                    <br/>
                    <span className="tagsInPhotos">{photo.tagList}</span>
                </li>
            );
        });
        
        return photosForDayNodes;
    }

    comparePhotosByDateTaken(photo1, photo2) {
        return Date.compare(new Date(photo1.dateTaken), new Date(photo2.dateTaken)) * -1;
    }

    getMonthLabel(date) {
        let monthLabel = "";
        switch (date.getMonth()) {
            case 0:
                monthLabel = "Jan";
                break;
            case 1:
                monthLabel = "Feb";
                break;
            case 2:
                monthLabel = "Mar";
                break;
            case 3:
                monthLabel = "Apr";
                break;
            case 4:
                monthLabel = "May";
                break;
            case 5:
                monthLabel = "Jun";
                break;
            case 6:
                monthLabel = "Jul";
                break;
            case 7:
                monthLabel = "Aug";
                break;
            case 8:
                monthLabel = "Sep";
                break;
            case 9:
                monthLabel = "Oct";
                break;
            case 10:
                monthLabel = "Nov";
                break;
            case 11:
                monthLabel = "Dec";
                break;
        }

        return monthLabel;
    }

    getPhotoFromDBPhoto (dbPhoto) {

        let photo = {};

        photo.dbId = dbPhoto.id;
        photo.url = dbPhoto.url;
        photo.thumbUrl = dbPhoto.thumbUrl;
        photo.orientation = dbPhoto.orientation;
        photo.title = dbPhoto.title;

        let width = dbPhoto.width;
        let height = dbPhoto.height;

        let ratio = null;
        if (photo.orientation == 6) {
            ratio = height / width;
        }
        else {
            ratio = width / height;
        }

        photo.height = 220;
        photo.width = ratio * photo.height;

        let dateTaken = dbPhoto.dateTaken;
        let dt = new Date(dateTaken);
        // photo.dateTaken = dt.toString("M/d/yyyy HH:mm");
        photo.dateTaken = dt.toString("M/d/yyyy hh:mm tt");

        photo.tagList = "";
        dbPhoto.tags.forEach(function(tag) {
            photo.tagList += tag + ", ";
        });
        photo.tagList = photo.tagList.substring(0, photo.tagList.length - 2);

        photo.dbPhoto = dbPhoto;

        return photo;
    }

    render() {

        let self = this;

        let photosFromReducer = [];

        // figure out a way to not do this each time render is invoked
        if (this.props.photos && this.props.photos.length > 0) {
            this.props.photos.forEach(function(dbPhoto, index) {
                let photo = self.getPhotoFromDBPhoto(dbPhoto);
                photosFromReducer.push(photo);
            });

            // if (photos.length > 0) {
            //     this.setState({selectedPhoto: photos[0]});
            // }
        }

        let lastYear = -1;
        let lastMonth = -1;
        let lastDate = -1;

        // let photosFromReducer = this.props.photos || [];

        // need an array of items where each item in the array is
        // - <p> with the date, followed by a
        // - <ul> with some number of photo <li> objects

        let daysOfPhotos = [];
        let dayOfPhotos = {};

        photosFromReducer.sort(this.comparePhotosByDateTaken);

        photosFromReducer.map(function(photo) {

            let dateTaken = photo.dateTaken;
            let dt = new Date(dateTaken);

            if (dt.getYear() != lastYear || dt.getMonth() != lastMonth || dt.getDate() != lastDate) {

                lastYear = dt.getYear();
                lastMonth = dt.getMonth();
                lastDate = dt.getDate();

                if (!(dayOfPhotos.photos == undefined)) {
                    daysOfPhotos.push(dayOfPhotos);
                }

                dayOfPhotos = {};
                dayOfPhotos.dateTaken = dt;
                dayOfPhotos.photos = [];
            }
            dayOfPhotos.photos.push(photo);
        });

        if (typeof dayOfPhotos.photos == "object" && dayOfPhotos.photos.length > 0) {
            daysOfPhotos.push(dayOfPhotos);
        }

        let daysOfPhotosNodes = daysOfPhotos.map(function(dayOfPhotos) {

            let formattedDateTime = self.getMonthLabel(dayOfPhotos.dateTaken) + " " + dayOfPhotos.dateTaken.toString("dd, yyyy");
            return (
                <div className="dayOfPhotosDiv" key={Math.random().toString()}>
                    <p id={formattedDateTime} className="dayOfPhotosLabel">{formattedDateTime}</p>
                    <ul className="flex-container wrap">
                        {self.getDayOfPhotoNodes(dayOfPhotos)}
                    </ul>
                </div>
            );
        });

        let openCloseLabel = "=>";
        if (!this.props.sideBarOpen) {
            openCloseLabel = "<=";
        }

        return (

            <div>
                <Link to="/herro">Herro</Link>
                <button id="openCloseIcon" className="plainButton" type="button" onClick={this.props.onToggleOpenCloseSidebar.bind(this)}>{openCloseLabel}</button>
                {daysOfPhotosNodes}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photos
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPhotos: fetchPhotos, selectPhoto: selectPhoto, updateSelectedPhotos: updateSelectedPhotos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGrid);
