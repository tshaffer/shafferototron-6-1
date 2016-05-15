/**
 * Created by tedshaffer on 5/7/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {updateAlbums} from '../actions/index';
import { fetchAlbums } from '../actions/index';
import { createAlbum } from '../actions/index';
import { getPhotosInAlbum } from '../actions/index';
import { addPhotosToAlbum } from '../actions/index';

class Albums extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            albums: []
        };
    }

    componentWillMount() {

        this.albums = [];
        this.albumsByName = {};
        this.selectedAlbum = null;

        console.log("albums: componentWillMount invoked");
        this.props.fetchAlbums();
    }

    componentDidMount() {
        console.log("albums componentDidMount invoked");
    }

    createAlbum() {
        this.props.createAlbum(this.state.albumName);
    }

    onAlbumSelected(event) {
        console.log("onAlbumSelected invoked");
        const selectedAlbumName = event.target.value;
        this.selectedAlbum = this.albumsByName[selectedAlbumName];
        console.log("this.selectedAlbum = " + this.selectedAlbum.name);
    }

    // TODO - duplicate code with photos.js

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

    onShowAlbum(event) {
        console.log("onShowAlbum invoked");
        this.props.getPhotosInAlbum(this.selectedAlbum.id);
    }

    onAddSelectedPhotosToAlbum(event) {

        let photosToAdd = [];

        console.log("onAddSelectedPhotosToAlbum invoked");

        for (var property in this.props.selectedPhotos) {
            if (this.props.selectedPhotos.hasOwnProperty(property)) {
                const selectedPhoto = this.props.selectedPhotos[property];
                photosToAdd.push(selectedPhoto.dbId);
            }
        }

        if (photosToAdd.length == 0) return;

        this.props.addPhotosToAlbum(this.selectedAlbum.id, photosToAdd);
    }

    render() {

        var self = this;

        // let selectOptions = this.state.albums.map(function(album, index) {
        var currentAlbums = [];
        if (this.props.albums) {
            if (this.props.albums.length > 0) {
                if (Object.keys(this.albumsByName).length === 0 && this.albumsByName.constructor === Object) {
                    this.props.albums.forEach(function(album, index) {
                        self.albumsByName[album.name] = album;
                    });
                    self.selectedAlbum = self.props.albums[0];
                }
            }
            currentAlbums = this.props.albums;
        }
        let selectOptions = currentAlbums.map(function(album, index) {
            return (
                <option value={album.name} key={album.id}>{album.name}</option>
            );
        });

        let albumsDiv = <div></div>;
        if (this.props.albums.length > 0) {
            albumsDiv =
                <div>
                    <select defaultValue={this.props.albums[0].name} id="albums" onChange={this.onAlbumSelected.bind(this)}>{selectOptions}</select>

                    <br/>
                    <button onClick={this.onAddSelectedPhotosToAlbum.bind(this)}>Add to album</button>
                    <button onClick={this.onShowAlbum.bind(this)}>Show album</button>
                </div>
        }

        const divStyle = {
            margin: '5px'
        };

        return (

            <div>
                <h4>Albums</h4>

                <div style={divStyle}>
                    <input
                        value={this.state.albumName}
                        onChange={event => this.setState( { albumName: event.target.value} ) }/>
                    <button onClick={this.createAlbum.bind(this)}>Create Album</button>
                </div>

                {albumsDiv}


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        albums: state.albums
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPhotosInAlbum: getPhotosInAlbum, fetchAlbums: fetchAlbums, createAlbum: createAlbum, addPhotosToAlbum: addPhotosToAlbum }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
