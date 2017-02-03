import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { load } from './actions.js'

import { optionsApp } from './reducers.js';
import { WeekView, ArchWeekView} from './weekview.jsx';
import { habisave } from './habisave'

//require("./fonts/ptsans.ttf")
require("./less/base.less");
require("./less/options.less");

const store = createStore(optionsApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

var OptionsApp = React.createClass({
    componentWillMount: function() {
        var b = this;
        habisave.pullOptions(function(_s) { b.props.load(_s.optionsStoreState) });
    },
    getInitialState: function() {
        return { mode: "CHARTS" };
    },
    setMode: function(m) {
        this.setState({ mode: m })
    },
    render: function() {
        var lowerContent;

        switch (this.state.mode) {
            case "CHARTS":
                lowerContent = <ChartsView {...this.props}/>;
                break;

            case "GRAPH":
                lowerContent = <GraphView {...this.props}/>;
                break;

            case "ADVICE":
                lowerContent = <AdviceView {...this.props}/>;
                break;

            case "SETTINGS":
                lowerContent = <SettingsView {...this.props}/>;
                break;
        }

        return (<div>
		<NavBar mode = {this.state.mode} setMode = {this.setMode}/>
		{lowerContent}
		</div>);
    }
})

const mapStateToProps = (state) => {
    return {
        archTasks: state.archTasks,
        settings: state.settings,
        current: state.current
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        /* removeTask: (tid) => {
           dispatch(removeTask(tid))
         },*/
        load: (_state) => {
            dispatch(load(_state))
        }
    }
}

var NavBar = React.createClass({
    render: function() {
        return (
            <div id = "navbar">
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("CHARTS")}>Charts</a>
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("GRAPH")}>Graph</a>
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("ADVICE")}>Advice</a>
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("SETTINGS")}>Settings</a>
			</div>
        );
    }
})

var ChartsView = React.createClass({
    render: function() {
        var b = this.props.archTasks.length + "";


        return (<div>

			{this.props.archTasks.map((at) => (<ArchWeekView {...at} key = {at.weekDate}/>))}

			</div>);
    }
})

var GraphView = React.createClass({
    render: function() {
        return (<div>GRAPH</div>);
    }
})

var AdviceView = React.createClass({
    render: function() {
        return (<div>ADVICE</div>);
    }
})

var SettingsView = React.createClass({
    render: function() {
        return (<div>SETTINGS</div>);
    }
})



const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionsApp)


render(<Provider store = {store}><App/></Provider>, document.getElementById('optionsApp'));
