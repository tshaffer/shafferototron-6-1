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
            collapsedStateYears: {},
            collapsedStateMonths: {}
        };
    }

    componentWillMount() {
        console.log("navigator componentWillMount invoked");
    }

    componentDidMount() {
        console.log("navigator componentDidMount invoked");
    }

    getMonthLabel(month) {
        let monthLabel = "";
        switch (month) {
            case 0:
                monthLabel = "Jan";
                break;
            case 1:
                monthLabel = "Feb";
                break;
            case 2:
                monthLabel = "Mar";
                break;
            case 3:
                monthLabel = "Apr";
                break;
            case 4:
                monthLabel = "May";
                break;
            case 5:
                monthLabel = "Jun";
                break;
            case 6:
                monthLabel = "Jul";
                break;
            case 7:
                monthLabel = "Aug";
                break;
            case 8:
                monthLabel = "Sep";
                break;
            case 9:
                monthLabel = "Oct";
                break;
            case 10:
                monthLabel = "Nov";
                break;
            case 11:
                monthLabel = "Dec";
                break;
        }

        return monthLabel;
    }


    copyCollapsedStateYears() {

        let collapsedStateYears = {};

        for (var year in this.state.collapsedStateYears) {
            if (this.state.collapsedStateYears.hasOwnProperty(year)) {
                collapsedStateYears[year] = this.state.collapsedStateYears[year];
            }
        }

        return collapsedStateYears;
    }


    handleClickYear(year) {

        let collapsedStateYears = this.copyCollapsedStateYears();

        if (!(year in collapsedStateYears)) {
            collapsedStateYears[year] = false;
        }
        else {
            collapsedStateYears[year] = !collapsedStateYears[year];
        }
        this.setState({collapsedStateYears: collapsedStateYears});
    }

    copyCollapsedStateMonths() {

        let collapsedStateMonths = {};

        for (var month in this.state.collapsedStateMonths) {
            if (this.state.collapsedStateMonths.hasOwnProperty(month)) {
                collapsedStateMonths[month] = this.state.collapsedStateMonths[month];
            }
        }

        return collapsedStateMonths;
    }


    handleClickMonth(month) {

        let collapsedStateMonths = this.copyCollapsedStateMonths();

        if (!(month in collapsedStateMonths)) {
            collapsedStateMonths[month] = false;
        }
        else {
            collapsedStateMonths[month] = !collapsedStateMonths[month];
        }
        this.setState({collapsedStateMonths: collapsedStateMonths});
    }


    handleClickDay(year, month, day) {
        console.log("clicked on ", year, month, day);
    }

    buildTree() {

        var self = this;

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
                    monthNode.label = self.getMonthLabel(month);
                    monthNode.html = <span className="node" onClick={self.handleClickMonth.bind(self, monthNode.label)}>{monthNode.label}</span>;
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
                    dayNode.html = <span className="node" onClick={self.handleClickDay.bind(self, yearNode.label, monthNode.label, dayNode.label)}>{dayNode.label}</span>;

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

    renderTreeNodes(treeNodes) {

        let renderedTreeNodes = treeNodes.map((yearNode, i) => {

            const yearLabel = <span className="node" onClick={this.handleClickYear.bind(this, yearNode.label)}>
                {yearNode.label}
                </span>;

            return (
                <TreeView
                    collapsed = {this.state.collapsedStateYears[yearNode.label] == false ? false : true }
                    nodeLabel = {yearLabel}
                    onClick={this.handleClickYear.bind(this, yearNode.label)}
                    className="node"
                    key = {yearNode.label}
                >

                {yearNode.months.map(monthNode  =>
                    <TreeView
                        collapsed = {this.state.collapsedStateMonths[monthNode.label] == false ? false : true }
                        nodeLabel={monthNode.html}
                        onClick={this.handleClickMonth.bind(this, monthNode.label)}
                        className="node"
                        key={yearNode.label + monthNode.label}>

                        {monthNode.days.map(dayNode =>
                            <TreeView
                                collapsed={false}
                                nodeLabel={dayNode.html}
                                onClick={this.handleClickDay.bind(this, dayNode.yearLabel, dayNode.monthLabel, dayNode.label)}
                                className="node"
                                key={yearNode.label + monthNode.label + dayNode.label}>
                            </TreeView>
                        )}
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
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photos
    };
}

export default connect(mapStateToProps)(Navigator);
