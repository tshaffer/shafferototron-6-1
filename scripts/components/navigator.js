/**
 * Created by tedshaffer on 5/28/16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';
import jstree from 'jstree';

class Navigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.navigatorDisplayed = false;
    }

    componentWillMount() {
        // $(function () {
        //     $('#jstree_demo_div').jstree();
        // });
        console.log("navigator componentWillMount invoked");
    }

    componentDidMount() {
        console.log("navigator componentDidMount invoked");
    }

    render() {

        console.log("navigator.render() - number of props photos is: " + this.props.photos.length.toString());

        // if (!this.navigatorDisplayed) {
        //
        //     let photoData = { 'data' : [
        //         'Simple sausage pizza',
        //         {
        //             'text' : 'Root node 2',
        //             'state' : {
        //                 'opened' : true,
        //                 'selected' : true
        //             },
        //             'children' : [
        //                 { 'text' : 'Child 1' },
        //                 'Child 2'
        //             ]
        //         }
        //     ]}
        //
        //     $('#jstree_demo_div').jstree({ 'core' : photoData });
        //     this.navigatorDisplayed = true;
        // }

        return (
          <div>
              All Photos
              <div id="jstree_demo_div"></div>
          </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        photos: state.photos
    };
}

export default connect(mapStateToProps)(Navigator);
