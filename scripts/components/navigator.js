/**
 * Created by tedshaffer on 5/28/16.
 */
import React, { Component } from 'react';

import $ from 'jquery';
import jstree from 'jstree';

class Navigator extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        $(function () {
            $('#jstree_demo_div').jstree();
        });
        console.log("navigator componentWillMount invoked");
    }

    componentDidMount() {
        console.log("navigator componentDidMount invoked");
    }

    render() {

        let photoData = { 'data' : [
            'Simple root node pizza',
            {
                'text' : 'Root node 2',
                'state' : {
                    'opened' : true,
                    'selected' : true
                },
                'children' : [
                    { 'text' : 'Child 1' },
                    'Child 2'
                ]
            }
        ]}

        $('#jstree_demo_div').jstree({ 'core' : photoData });

        return (
          <div>
              <div id="jstree_demo_div"></div>
          </div>
        );
    }

}

export default Navigator;