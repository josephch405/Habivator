import React from 'react';
import {render} from 'react-dom';
import Tlib from './task.jsx'

//require("./fonts/ptsans.ttf")
require("./base.less");
require("./options.less");

var OptionsApp = React.createClass({
	getInitialState: function(){
		Tlib.pull();
		return {mode:"CHARTS"};
	},
	setMode: function(m){
		this.setState({mode:m})
	},
	render: function(){
		var lowerContent;

		switch(this.state.mode){
			case "CHARTS":
				lowerContent = <ChartsView/>;
				break;

			case "GRAPH":
				lowerContent = <GraphView/>;
				break;

			case "ADVICE":
				lowerContent = <AdviceView/>;
				break;

			case "SETTINGS":
				lowerContent = <SettingsView/>;
				break;
		}

		return(<div>
		<NavBar mode = {this.state.mode} setMode = {this.setMode}/>
		{lowerContent}
		</div>);
	}
})

var NavBar = React.createClass({
	render: function(){
		return(
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
	render: function(){
		return (<div>CHARTS</div>);
	}
})

var GraphView = React.createClass({
	render: function(){
		return (<div>GRAPH</div>);
	}
})

var AdviceView = React.createClass({
	render: function(){
		return (<div>ADVICE</div>);
	}
})

var SettingsView = React.createClass({
	render: function(){
		return (<div>SETTINGS</div>);
	}
})

render(<OptionsApp/>, document.getElementById('optionsApp'));