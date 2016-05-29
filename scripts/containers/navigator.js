/**
 * Created by tedshaffer on 5/28/16.
 */
import React, { Component } from 'react';
import TreeView from 'react-treeview';

class Navigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsedBookkeeping: true
        };
    }

    componentWillMount() {
        console.log("navigator componentWillMount invoked");
    }

    componentDidMount() {
        console.log("navigator componentDidMount invoked");
    }

    handleClick() {
        let collapsedBookkeeping = this.state.collapsedBookkeeping;
        collapsedBookkeeping = !this.state.collapsedBookkeeping;
        this.setState({collapsedBookkeeping: collapsedBookkeeping});
    }

    render() {

        const label1 =
            <span className="node">
              Pizza
            </span>;

        const label2 =
            <span className="node">
              Salami
            </span>;

        const label3 =
            <span className="node">
              Grandparent
            </span>;

        return (
            <div>
                <div>herro</div>
                <TreeView
                    collapsed = {false}
                    nodeLabel = {label1}>
                </TreeView>
                <TreeView
                    collapsed = {this.state.collapsedBookkeeping}
                    onClick={this.handleClick.bind(this)}
                    nodeLabel = {label2}>
                    <div className="info">Child 1</div>
                    <div className="info">Child 2</div>
                </TreeView>
            </div>
        );
    }

}

export default Navigator;
