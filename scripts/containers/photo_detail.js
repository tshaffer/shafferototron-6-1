/**
 * Created by tedshaffer on 5/1/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Metadata from '../components/metadata';
import Search from '../components/search';
import Albums from '../containers/albums';
import Tags from '../containers/tags';

class PhotoDetail extends Component {

    render () { 
        
        return (
            <div>
                <Metadata selectedPhoto = {this.props.photo}/>
                <Search 
                    onQueryPhotos={this.props.onQueryPhotos}
                    selectedPhoto = {this.props.photo}
                />
                <Albums
                    onCreateAlbum={this.props.onCreateAlbum}
                    selectedPhotos = {this.props.selectedPhotos}
                />
                <Tags
                    selectedPhotos = {this.props.selectedPhotos}
                />
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        photo: state.activePhoto,
        selectedPhotos: state.selectedPhotos,
    };
}

export default connect(mapStateToProps)(PhotoDetail);
