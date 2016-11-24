import React from 'react';
import {render} from 'react-dom';
import WeekView from './weekview.jsx';
import DayView from './dayview.jsx';
import Tlib from './task.jsx'

require("./main.less");

var PopupApp = React.createClass({
	getInitialState: function(){
		Tlib.rerenderHook = this.setTasks;
		Tlib.create();
		Tlib.create();
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
		else { lowerContent = (<DayView/>)};

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
				<div className = "navbutton" onClick = {() => this.props.setMode("WEEK")}>Week</div>
				<div className = "navbutton" onClick = {() => this.props.setMode("DAY")}>Day</div>
				<div className = "navbutton">More</div>
			</div>
		);
	}
})


render(<PopupApp/>, document.getElementById('app'));