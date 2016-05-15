/**
 * Created by tedshaffer on 5/2/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryPhotos } from '../actions/index';

import { bindActionCreators } from 'redux';

import PhotoGrid from '../containers/photo-grid';
import PhotoDetail from '../containers/photo_detail';

class Photos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            divStyle: {},
            sideBarOpen: true
        };
    }

    handleResize(e) {
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentDidMount() {
        console.log("photos.js::componentDidMount invoked");

        // // $scope.photoPageContainerHeight = window.innerHeight - 100;
        window.addEventListener('resize', this.handleResize.bind(this));
        let divStyle = {
            height: window.innerHeight - 100
        };
        this.setState({divStyle: divStyle});

    }

    queryPhotos (querySpec) {

        let queryStr = JSON.stringify(querySpec);
        let query = { querySpec: queryStr };

        this.props.queryPhotos(query);
    }

    handleQueryPhotos(querySpec) {
        console.log("handleQueryPhotos invoked");
        console.log("querySpec=" + querySpec);
        this.queryPhotos(querySpec);
    }

    handleToggleOpenCloseSidebar() {
        this.setState({sideBarOpen: !this.state.sideBarOpen});
    }

    render () {

        let containerTag = <div></div>
        if (this.state.sideBarOpen) {
            containerTag =
                <div className="metadata">
                    <PhotoDetail
                        onQueryPhotos={this.handleQueryPhotos.bind(this)}
                    />
                </div>
        }

        return (
            <div className="photoPageContainer" style={this.state.divStyle}>
                <div className="photosDiv">
                    <PhotoGrid
                        onToggleOpenCloseSidebar={this.handleToggleOpenCloseSidebar.bind(this)}
                        sideBarOpen = {this.state.sideBarOpen}
                    />
                </div>

                {containerTag}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ queryPhotos: queryPhotos }, dispatch);
}

export default connect(null, mapDispatchToProps)(Photos);
