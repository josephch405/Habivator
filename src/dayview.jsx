import React from 'react';
import Tlib from './task.jsx';

const DayView = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (<div id = "dayPanel">
			{this.props.tasks.map((t) => (<DayBox {...t} key = {t.id}/>))}
			</div>);
	}
})

const DayBox = React.createClass({
	render:function(){
		var day = Tlib.dayOfWeek();
		var quant = "";
		switch(this.props.unit){
			case 1: quant = this.props.quantity + " reps";
				break;
			case 2: quant = this.props.quantity + " mins";
				break;
		}
		return (<div className = "dayBox" id = {this.props.id}>
			<div className = "dayBoxTop">
				{this.props.name}<br/>
				{quant}
			</div>
			<ButtonBox tid = {this.props.id} s = {this.props.daysDone[day]} did = {day}/>
				
		</div>)
	}
})


const ButtonBox = React.createClass({
	clickHandle: function(){
		Tlib.boxClick(this.props.tid, this.props.did, false);
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
		return(<div className = {cname} onClick = {this.clickHandle}></div>);
	}
})

export default DayView;