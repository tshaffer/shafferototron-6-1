/**
 * Created by tedshaffer on 5/28/16.
 */
import React, { Component } from 'react';
import TreeView from 'react-treeview';
import { connect } from 'react-redux';

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

    buildTree() {

        let treeNodes = [];

        if (this.props.photos && this.props.photos.length > 0) {

            let yearNode = null;
            let monthNode = null;
            let dayNode = null;

            let lastYear = -1;
            let lastMonth = -1;
            let lastDay = -1;

            this.props.photos.forEach(function(dbPhoto, index) {

                let dateTaken = new Date(dbPhoto.dateTaken);

                // has year changed?
                let year = dateTaken.getFullYear();
                if (year != lastYear) {

                    // save entry
                    if (yearNode) {
                        monthNode.days.push(dayNode);
                        yearNode.months.push(monthNode);
                        treeNodes.push(yearNode);

                        monthNode = null;
                        dayNode = null;
                    }

                    // create new entry
                    yearNode = new Object();
                    yearNode.label = year.toString();
                    yearNode.months = [];

                    lastYear = year;
                    lastMonth = -1;
                    lastDay = -1;
                }

                // has month changed?
                let month = dateTaken.getMonth();
                if (month != lastMonth) {

                    // save entry
                    if (monthNode) {
                        monthNode.days.push(dayNode);
                        yearNode.months.push(monthNode);

                        dayNode = null;
                    }

                    // create new entry
                    monthNode = new Object();
                    monthNode.label = month.toString();
                    monthNode.days = [];

                    lastMonth = month;
                    lastDay = -1;
                }

                // has day changed?
                let day = dateTaken.getDate();
                if (day != lastDay) {

                    // save entry
                    if (dayNode) {
                        monthNode.days.push(dayNode);
                    }

                    // create new entry
                    dayNode = new Object();
                    dayNode.label = day.toString();

                    lastDay = day;
                }
            });

            if (yearNode) {
                monthNode.days.push(dayNode);
                yearNode.months.push(monthNode);
                treeNodes.push(yearNode);
            }
        }

        return treeNodes;
    }

// <div className="info" key={yearNode.label + monthNode.label}>{monthNode.label}</div>

// <div
// className="info" key={yearNode.label + monthNode.label}>{monthNode.label}
// </div>

    renderTreeNodes(treeNodes) {

        let renderedTreeNodes = treeNodes.map((yearNode, i) => {

            const yearLabel = <span className="node">
                {yearNode.label}
                </span>;

            return (
                <TreeView
                    collapsed = {false}
                    nodeLabel = {yearLabel}
                    key = {yearNode.label}
                >
                {yearNode.months.map(monthNode  =>
                    <TreeView
                        collapsed={false}
                        nodeLabel={monthNode.label}
                        className="node"
                        key={yearNode.label + monthNode.label}>
                    </TreeView>
                )}

                </TreeView>
            )
        });
        return renderedTreeNodes;
    }

    render() {

        let treeNodes = this.buildTree();
        let renderedTreeNodes = this.renderTreeNodes(treeNodes);

        return (
            <div>
                <div>All Photos</div>
                {renderedTreeNodes}
            </div>
        );

        // const label1 =
        //     <span className="node">
        //       Pizza
        //     </span>;
        //
        // const label2 =
        //     <span className="node">
        //       Salami
        //     </span>;
        //
        // const label3 =
        //     <span className="node">
        //       Grandparent
        //     </span>;
        //
        // const label4 =
        //     <span className="node">
        //       Parent
        //     </span>;
        //
        // const label5 =
        //     <span className="node">
        //       Child 3
        //     </span>;
        //
        // const label6 =
        //     <span className="node">
        //       Child 4
        //     </span>;
        //
        // return (
        //     <div>
        //         <div>All Photos</div>
        //         <TreeView
        //             collapsed = {false}
        //             nodeLabel = {label1}>
        //         </TreeView>
        //         <TreeView
        //             collapsed = {false}
        //             nodeLabel = {label3}>
        //             <TreeView
        //                 onClick={this.handleClick.bind(this)}
        //                 collapsed = {this.state.collapsedBookkeeping}
        //                 nodeLabel = {label4}>
        //                 <TreeView
        //                     collapsed={true}
        //                     nodeLabel={label5}>
        //                     </TreeView>
        //                 <TreeView
        //                     collapsed={true}
        //                     nodeLabel={label6}>
        //                     </TreeView>
        //             </TreeView>
        //         </TreeView>
        //         <TreeView
        //             collapsed = {true}
        //             nodeLabel = {label2}>
        //             <div className="info">Child 1</div>
        //             <div className="info">Child 2</div>
        //         </TreeView>
        //     </div>
        // );
    }

}

function mapStateToProps(state) {
    return {
        photos: state.photos
    };
}

export default connect(mapStateToProps)(Navigator);
