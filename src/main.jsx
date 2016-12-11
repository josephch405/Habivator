import React from 'react';
import { render } from 'react-dom';
import { addTask, toggleDaysDone, toggleActiveDays, toggleUnit, setQuant } from './actions.js'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import mainApp from './reducers.js';
import WeekView from './weekview.jsx';
import DayView from './dayview.jsx';

//require("./fonts/ptsans.ttf")
require("./base.less");
require("./main.less");

let store = createStore(mainApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const PopupApp = React.createClass({
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
		<NavBar mode = {this.state.mode} setMode = {this.setMode}/>
		{lowerContent}
		</div>);
	}
})

const mapStateToProps = (state) => {
	return {
		tasks: state.tasks
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: () => {
      dispatch(addTask())
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
    }
  }
}

const NavBar = React.createClass({
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

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupApp)

render(<Provider store = {store}><App/></Provider>, document.getElementById('app'));