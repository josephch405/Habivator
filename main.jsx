import React from 'react';
import {render} from 'react-dom';
import WeekView from './weekview.jsx';
import DayView from './dayview.jsx';

require("./main.less");

var PopupApp = React.createClass({
	getInitialState: function(){
		return {mode:"WEEK", 
			tasks:[
				{"name":"New Task",
				"id":1,
				"karma":-67,
				"activeDays":[true,true,true,false,true,true,true],
				"daysDone":[2,2,2,0,2,1,1],
				"unit":1,
				"quantity":1,
				"editMode":0,
				"toss":0},
				{"name":"New Task 2",
				"id":2,
				"karma":-67,
				"activeDays":[true,true,true,true,true,true,true],
				"daysDone":[2,2,3,2,2,1,1],
				"unit":0,
				"quantity":1,
				"editMode":0,
				"toss":0}
			]};
	},
	setMode: function(m){
		this.setState({mode:m})
	},
	render: function(){

		var lowerContent;
		if(this.state.mode == "WEEK"){lowerContent = (<WeekView tasks = {this.state.tasks}/>)}
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