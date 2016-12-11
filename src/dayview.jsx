import React from 'react';

const dayOfWeek = function(){
	return (new Date().getDay() + 6) % 7;
}

const DayView = React.createClass({
	getInitialState: function(){
		return {};
	},
	render: function(){
		return (<div id = "dayPanel">
			{this.props.tasks.map((t) => (<DayBox {...t} toggleDaysDone = {this.props.toggleDaysDone} key = {t.id}/>))}
			</div>);
	}
})

const DayBox = React.createClass({
	render:function(){
		var day = dayOfWeek();
		var quant = "";
		switch(this.props.unit){
			case 1: quant = this.props.quant + " reps";
				break;
			case 2: quant = this.props.quant + " mins";
				break;
		}
		return (<div className = "dayBox" id = {this.props.id}>
			<div className = "dayBoxTop">
				{this.props.name}<br/>
				{quant}
			</div>
			<ButtonBox tid = {this.props.id} toggleDaysDone = {this.props.toggleDaysDone} s = {this.props.daysDone[day]} did = {day}/>
				
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
		return(<div className = {cname} onClick = {()=>this.props.toggleDaysDone(this.props.tid, dayOfWeek())}></div>);
	}
})

export default DayView;