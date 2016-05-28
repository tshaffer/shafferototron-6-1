/**
 * Created by tedshaffer on 5/2/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryPhotos } from '../actions/index';
import { addFolder } from '../actions/index';

import { bindActionCreators } from 'redux';

import Navigator from '../components/navigator';
import PhotoGrid from '../containers/photo-grid';
import PhotoDetail from '../containers/photo_detail';

// electron only
const {remote} = require('electron');
const {Menu, MenuItem, dialog} = remote;

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

        // electron only
        var self = this;

        const menuTemplate = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Add Folder',
                        click: function() {
                            self.addFolderToDB();
                        }
                    }
                ]
            }
        ];

        if (process.platform === 'darwin') {
            const name = remote.app.getName();
            menuTemplate.unshift({
                label: name,
                submenu: [
                    {
                        label: 'About ' + name,
                        role: 'about'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Services',
                        role: 'services',
                        submenu: []
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Hide ' + name,
                        accelerator: 'Command+H',
                        role: 'hide'
                    },
                    {
                        label: 'Hide Others',
                        accelerator: 'Command+Alt+H',
                        role: 'hideothers'
                    },
                    {
                        label: 'Show All',
                        role: 'unhide'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'Command+Q',
                        click: function() {
                            remote.app.quit();
                        }
                    },
                ]
            });
            // Window menu.
            // menuTemplate[3].submenu.push(
            //     {
            //         type: 'separator'
            //     },
            //     {
            //         label: 'Bring All to Front',
            //         role: 'front'
            //     }
            // );
        }

        const menu = Menu.buildFromTemplate(menuTemplate);
        Menu.setApplicationMenu(menu);
    }

    // electron only
    addFolderToDB() {

        var self = this;

        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, function (directory) {
            if (directory) {
                console.log("addFolderToDB - selectedDirectory" + directory);
                self.props.addFolder(directory);
            }
        })
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
                <div className="navigatorDiv">
                    <Navigator></Navigator>
                    </div>
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
    return bindActionCreators({ addFolder: addFolder, queryPhotos: queryPhotos }, dispatch);
}

export default connect(null, mapDispatchToProps)(Photos);
