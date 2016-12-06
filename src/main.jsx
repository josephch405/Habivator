import React from 'react';
import {render} from 'react-dom';
import WeekView from './weekview.jsx';
import DayView from './dayview.jsx';
import Tlib from './task.jsx'

//require("./fonts/ptsans.ttf")
require("./main.less");

var PopupApp = React.createClass({
	getInitialState: function(){
		Tlib.rerenderHook = this.setTasks;
		Tlib.pull();
		return {mode:"WEEK", 
			tasks:Tlib.tasks};
	},
	setMode: function(m){
		this.setState({mode:m})
	},
	setTasks: function(t){
		this.setState({tasks: t})
	},
	render: function(){
		var lowerContent;
		if(this.state.mode == "WEEK"){lowerContent = (<WeekView  tasks = {this.state.tasks}/>)}
		else { lowerContent = (<DayView tasks = {this.state.tasks}/>)};

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
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("WEEK")}>Week</a>
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("DAY")}>Day</a>
				<a href = "#" className = "navbutton">More</a>
			</div>
		);
	}
})


render(<PopupApp/>, document.getElementById('app'));