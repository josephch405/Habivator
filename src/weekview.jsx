import React from 'react';

const ArchiveWeekView = React.createClass({
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
			<div onClick = {() => {}}>Add New Habit</div>
			</div>);
	}
})

const WeekView = React.createClass({
	render: function(){
		//functions for callbacks, etc; excluding the task in props
		var _fs = Object.assign({}, this.props);
		delete _fs.tasks;

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

			{this.props.tasks.map((t) => (<TaskRow {...t} {..._fs} key = {t.id}/>))}
			<div id = "addNewRow" onClick = {this.props.addTask}>+ Add New Habit</div>
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
	keyPress: function(t){
		if(t.charCode==13)
            this.toggleEdit();
	},
	nameChange : function(e){
		this.props.setName(this.props.id, e.target.value);
	},
	quantChange : function(e){
		if (parseInt(e.target.value) > 0){
			this.props.setQuant(this.props.id, parseInt(e.target.value));
		}
	},
	render: function(){
		var quant, buttonRow, name;
		var tid = this.props.id;
		if (!this.state.editMode){
			name = this.props.name;
			buttonRow = this.props.daysDone.map((s, i) => (<ButtonBox 
				onClick = {() => this.props.toggleDaysDone(tid, i)}
				e = {this.state.editMode} 
				tid = {tid} 
				s = {s} 
				key = {i} 
				did = {i}/>));		
			switch(this.props.unit){
				case 1: quant = <div className = "quant">{this.props.quant} reps</div>; break;
				case 2: quant = <div className = "quant">{this.props.quant} mins</div>; break;
			}
		}
		else{
			name = <input value = {this.props.name} onChange = {this.nameChange} onKeyPress={this.keyPress}/>;
			var cat = (catName) =>{return <a href = "#" onClick = {()=>this.props.toggleUnit(tid)}>{catName}</a>};
			var q = <input type = "number" value = {this.props.quant} onChange = {this.quantChange} onKeyPress={this.keyPress}/>
			switch(this.props.unit){
				case 0: quant = <div className = "quant">{cat("N/A")}</div>; break;
				case 1: quant = <div className = "quant">{q}{cat("reps")}</div>; break;
				case 2: quant = <div className = "quant">{q}{cat("mins")}</div>; break;
			}
			buttonRow = this.props.activeDays.map((s, i) => (<ButtonBox 
				onClick = {() => this.props.toggleActiveDays(tid, i)}
				e = {this.state.editMode} 
				tid = {tid} 
				s = {s ? 3:2} 
				key = {i} 
				did = {i}/>))
		}
		return(<div className="taskRow">
			<div className = "karmaFlair"/>
			<div className = "taskName">{name}{quant}</div>
			{buttonRow}
			<div className = "taskDelete" onClick = {()=>{this.props.removeTask(this.props.id)}}/>
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
		return(<div className = {cname} onClick = {this.props.onClick}></div>);
	}
})


export default WeekView;