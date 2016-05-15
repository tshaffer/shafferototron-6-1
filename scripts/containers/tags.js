/**
 * Created by tedshaffer on 5/14/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchTags } from '../actions/index';
// import { addTag } from '../actions/index';
import { updateTagsInPhotos } from '../actions/index';

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // albumName: '',
            // albums: []
        };

        this.selectedTag = null;
    }

    componentWillMount() {
        console.log("tags: componentWillMount invoked");
        this.props.fetchTags();
    }

    componentDidMount() {
        console.log("tags: componentDidMount invoked");
    }

    isTagMissingFromPhoto(indexOfTag) {
        return indexOfTag < 0;
    }

    addTagToPhoto(photoToUpdate, indexOfTag) {
        photoToUpdate.tags.push(this.selectedTag);
    }

    getAssignTagPhotoToUpdate(photo) {

        var photoToUpdate = this.getPhotoToUpdate(photo, this.isTagMissingFromPhoto, this.addTagToPhoto);
        return photoToUpdate;
    };

    isTagPresentInPhoto(indexOfTag) {
        return indexOfTag >= 0;
    }

    removeTagFromPhoto(photoToUpdate, indexOfTag) {
        photoToUpdate.tags.splice(indexOfTag, 1);
    }

    getUnassignTagPhotoToUpdate(photo) {
        var photoToUpdate = this.getPhotoToUpdate(photo, this.isTagPresentInPhoto, this.removeTagFromPhoto);
        return photoToUpdate;
    };

    getPhotoToUpdate(photo, performActionOnPhoto, executeActionOnPhoto) {

        var indexOfTag = photo.dbPhoto.tags.indexOf(this.selectedTag);
    
        var photoToUpdate = null;
    
        if (performActionOnPhoto(indexOfTag)) {
    
            photoToUpdate = {};
    
            photoToUpdate.id = photo.dbPhoto.id;
            photoToUpdate.tags = photo.dbPhoto.tags;

            executeActionOnPhoto.call(this, photoToUpdate, indexOfTag);
            // executeActionOnPhoto(photoToUpdate, indexOfTag).bind(this);
        }
    
        return photoToUpdate;
    }

    buildPhotosUpdateSpec(getPhotoFunc, performActionOnPhoto, executeActionOnPhoto) {

        var selectedPhotos = this.props.selectedPhotos;
    
        var photosUpdateSpec = [];

        for (var property in selectedPhotos) {
            if (selectedPhotos.hasOwnProperty(property)) {
                let selectedPhoto = selectedPhotos[property];

                var photoToUpdate = getPhotoFunc.call(this, selectedPhoto, performActionOnPhoto, executeActionOnPhoto);
                if (photoToUpdate != null) {
                    photosUpdateSpec.push(photoToUpdate);
                }
            }
        }

        return photosUpdateSpec;
    };

    updateTags(photosUpdateSpec) {

        this.props.updateTagsInPhotos(photosUpdateSpec);

        // var self = this;
        // self.photosUpdateSpec = photosUpdateSpec;
        //
        // var updateTagsPromise = $shafferotoServerService.updateTags(photosUpdateSpec);
        //
        // updateTagsPromise.then(function (result) {
        //
        //     self.photosUpdateSpec.forEach(function(photoToUpdate) {
        //         var image = self.imagesById[photoToUpdate.id];
        //         image.tagList = "";
        //         photoToUpdate.tags.forEach(function(tag) {
        //             image.tagList += tag + ", ";
        //         });
        //         image.tagList = image.tagList.substring(0, image.tagList.length - 2);
        //     });
        // });
    };

    onTagSelected(event) {
        console.log("onTagSelected invoked");
        this.selectedTag = event.target.value;
        console.log("this.selectedTag = " + this.selectedTag);
    }

    onTagPhotos(event) {
        var photosUpdateSpec = this.buildPhotosUpdateSpec(this.getAssignTagPhotoToUpdate, this.isTagMissingFromPhoto, this.addTagToPhoto);
        if (photosUpdateSpec.length > 0) {
            this.updateTags(photosUpdateSpec);
        }
    };

    onUntagPhotos() {
        var photosUpdateSpec = this.buildPhotosUpdateSpec(this.getUnassignTagPhotoToUpdate, this.isTagPresentInPhoto, this.removeTagFromPhoto);
        if (photosUpdateSpec.length > 0) {
            this.updateTags(photosUpdateSpec);
        }
    };

    render() {

        let selectOptions = null;

        if (this.props.tags) {
            selectOptions = this.props.tags.map(function(tag, index) {
                return (
                    <option value={tag.name} key={tag.id}>{tag.name}</option>
                );
            });
        }

        let tagsDiv = <div></div>;
        if (this.props.tags && this.props.tags.length > 0) {
            tagsDiv =
                <div>
                    <select defaultValue={this.props.tags[0]} id="tags" onChange={this.onTagSelected.bind(this)}>{selectOptions}</select>
                    <br/>
                    <button onClick={this.onTagPhotos.bind(this)}>Assign tag</button>
                    <button onClick={this.onUntagPhotos.bind(this)}>Unassign tag</button>
                </div>
            if (this.selectedTag == null) {
                this.selectedTag = this.props.tags[0];
            }
        }

        return (
            <div>
                <h4>Tags</h4>

                <div className="tagsSubsection">
                    {tagsDiv}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tags: state.tags
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchTags: fetchTags, updateTagsInPhotos: updateTagsInPhotos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
