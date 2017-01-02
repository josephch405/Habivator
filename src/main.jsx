import React from 'react';
import { render } from 'react-dom';
import { addTask, toggleDaysDone, toggleActiveDays, toggleUnit, setQuant, setTime, setName, pullPopup, load, removeTask } from './actions.js'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { popupApp } from './reducers.js';
import WeekView from './weekview.jsx';
import DayView from './dayview.jsx';
import { habisave } from './habisave'

import moment from 'moment';

//require("./fonts/ptsans.ttf")
require("./less/base.less");
require("./less/main.less");

const store = createStore(popupApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

/*
const push = (popupStore) => {
    chrome.storage.sync.set({'popupStore': popupStore}, function() {
          console.log('tasks saved');
    });
}
*/

const PopupApp = React.createClass({
	componentWillMount: function(){
		var a = this;
		habisave.pullPopup(function(_s){a.props.load(_s.popupStoreState)});
	},
	getInitialState: function(){
		return {mode:"WEEK"};
	},
	setMode: function(m){
		this.setState({mode:m})
	},
	setTasks: function(t){
		this.setState({tasks: t})
	},
	render: function(){
		var lowerContent;
		if(this.state.mode == "WEEK"){lowerContent = (<WeekView {...this.props}/>)}
		else { lowerContent = (<DayView {...this.props}/>)};
		return(<div>
		<NavBar weekEnded = {this.props.weekEnded} mode = {this.state.mode} setMode = {this.setMode}/>
		{lowerContent}
		</div>);
	}
})

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks,
		weekEnded: moment().diff(moment(state.weekDate), 'days') > 6
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: () => {
      dispatch(addTask())
    },
    removeTask: (tid) => {
      dispatch(removeTask(tid))
    },
    toggleDaysDone: (tid, did) => {
      dispatch(toggleDaysDone(tid, did))
    },
    toggleActiveDays: (tid, did) => {
      dispatch(toggleActiveDays(tid, did))
    },
    toggleUnit: (tid) => {
      dispatch(toggleUnit(tid))
    },
    setQuant: (tid, q) => {
      dispatch(setQuant(tid, q))
    },
    load:(_state)=>{
    	dispatch(load(_state))
    },
    setName: (tid, name)=>{
    	dispatch(setName(tid, name));
    }
  }
}

const NavBar = React.createClass({
	render: function(){
		var finishWeek;
		if(this.props.weekEnded){finishWeek = <a href = "#" id = "finishWeek" className = "navbutton" onClick = {habisave.weekendTally}>Finish Week</a>}
		return(
			<div id = "navbar">
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("WEEK")}>Week</a>
				<a href = "#" className = "navbutton" onClick = {() => this.props.setMode("DAY")}>Day</a>
				<a href = "#" className = "navbutton">More</a>
				{finishWeek}
			</div>
		);
	}
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupApp)


render(<Provider store = {store}><App/></Provider>, document.getElementById('app'));