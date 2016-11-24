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
			<div onClick = {() => {Tlib.create(); Tlib.rerender()}}>Add New Habit</div>
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
	quantChange : function(e){
		if (parseInt(e.target.value) > 0){
			Tlib.get(this.props.id).quantity = parseInt(e.target.value);
			Tlib.rerender();
		}
	},
	categChange: function(){
		Tlib.get(this.props.id).unit = (Tlib.get(this.props.id).unit + 1) % 3
		Tlib.rerender();
	},
	render: function(){
		var quant, buttonRow, name;
		if (!this.state.editMode){
			name = this.props.name;
			buttonRow = this.props.daysDone.map((s, i) => (<ButtonBox e = {this.state.editMode} tid = {this.props.id} s = {s} key = {i} did = {i}/>));		
			switch(this.props.unit){
				case 1: quant = <div className = "quant">{this.props.quantity} reps</div>; break;
				case 2: quant = <div className = "quant">{this.props.quantity} mins</div>; break;
			}
		}
		else{
			name = <input value = {this.props.name} onChange = {this.nameChange}/>;
			var cat = (catName) =>{return <a href = "#" onClick = {this.categChange}>{catName}</a>};
			var q = <input type = "number" value = {this.props.quantity} onChange = {this.quantChange}/>
			switch(this.props.unit){
				case 0: quant = <div className = "quant">{cat("N/A")}</div>; break;
				case 1: quant = <div className = "quant">{q}{cat("reps")}</div>; break;
				case 2: quant = <div className = "quant">{q}{cat("mins")}</div>; break;
			}
			buttonRow = this.props.activeDays.map((s, i) => (<ButtonBox e = {this.state.editMode} tid = {this.props.id} s = {s ? 3:2} key = {i} did = {i}/>))
		}
		return(<div className="taskRow">
			<div className = "karmaFlair"/>
			<div className = "taskName">{name}{quant}</div>
			{buttonRow}
			<div className = "taskDelete" onClick = {() => {Tlib.remove(this.props.id); Tlib.rerender()}}/>
			<div className = "taskEdit" onClick = {this.toggleEdit}/>
		</div>)
	}
})

const ButtonBox = React.createClass({
	clickHandle: function(){
		Tlib.boxClick(this.props.tid, this.props.did, this.props.e);
		Tlib.rerender();
	},
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
		return(<div className = {cname} onClick = {this.clickHandle}></div>);
	}
})


export default WeekView;