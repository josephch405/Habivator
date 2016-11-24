import React from 'react';
import Tlib from './task.jsx'

const WeekView = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (<div id = "weekPanel">
			<div id = "weekHeader">
				<div id = "o"/>
				<div className = "tag">Mon</div>
				<div className = "tag">Tue</div>
				<div className = "tag">Wed</div>
				<div className = "tag">Thu</div>
				<div className = "tag">Fri</div>
				<div className = "tag">Sat</div>
				<div className = "tag">Sun</div>
			</div>

			{this.props.tasks.map((t) => (<TaskRow {...t} key = {t.id}/>))}

			</div>);
	}
})

const TaskRow = React.createClass({
	getInitialState: function(){
		return {editMode: false};
	},
	toggleEdit: function(){
		this.setState({
			editMode: !this.state.editMode
		});
	},
	nameChange : function(e){
		Tlib.get(this.props.id).name = e.target.value;
		Tlib.rerender();
	},
	render: function(){
		var quant, buttonRow, name;
		if (!this.state.editMode){
			name = this.props.name;
			buttonRow = this.props.daysDone.map((s, i) => (<ButtonBox e = {this.state.editMode} s = {s} key = {i}/>));		
			if (this.props.unit == 1){
				//reps
				quant = <div className = "quant">{this.props.quantity} reps</div>;
			}
			else if (this.props.unit == 2){
				//mins
				quant = <div className = "quant">{this.props.quantity} mins</div>;
			}
		}
		else{
			name = <input value = {this.props.name} onChange = {this.nameChange}/>;
			buttonRow = this.props.activeDays.map((s, i) => (<ButtonBox e = {this.state.editMode} s = {s ? 3:2} key = {i}/>))
		}
		return(<div className="taskRow">
			<div className = "karmaFlair"/>
			<div className = "taskName">{name}{quant}</div>
			{buttonRow}
			<div className = "taskDelete"/>
			<div className = "taskEdit" onClick = {this.toggleEdit}/>
		</div>)
	}
})

const ButtonBox = React.createClass({
	render:function(){
		var cname = "bb";
		switch(this.props.s){
			case 0:
				cname += " b";
				break;
			case 1:
				cname += " w";
				break;
			case 2:
				cname += " r";
				break;
			case 3:
				cname += " g";
				break;
		}
		if (this.props.e){
			cname += " bbor"
		}
		return(<div className = {cname}></div>);
	}
})


export default WeekView;