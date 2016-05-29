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

        const label4 =
            <span className="node">
              Parent
            </span>;

        const label5 =
            <span className="node">
              Child 3
            </span>;

        const label6 =
            <span className="node">
              Child 4
            </span>;

        return (
            <div>
                <div>All Photos</div>
                <TreeView
                    collapsed = {false}
                    nodeLabel = {label1}>
                </TreeView>
                <TreeView
                    collapsed = {false}
                    nodeLabel = {label3}>
                    <TreeView
                        onClick={this.handleClick.bind(this)}
                        collapsed = {this.state.collapsedBookkeeping}
                        nodeLabel = {label4}>
                        <TreeView
                            collapsed={true}
                            nodeLabel={label5}>
                            </TreeView>
                        <TreeView
                            collapsed={true}
                            nodeLabel={label6}>
                            </TreeView>
                    </TreeView>
                </TreeView>
                <TreeView
                    collapsed = {true}
                    nodeLabel = {label2}>
                    <div className="info">Child 1</div>
                    <div className="info">Child 2</div>
                </TreeView>
            </div>
        );
    }

}

export default Navigator;
