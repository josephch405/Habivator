import React from 'react';
import moment from 'moment';

/*
 * UTILITY FUNCTIONS
 */
const unitString = (num) => {
    switch (num) {
        case 1:
            return "reps";
        case 2:
            return "mins";
    }
}

const colorString = (num) => {
    switch (num) {
        case 0:
            return "b";
        case 1:
            return "w";
        case 2:
            return "r";
            break;
        case 3:
            return " g";
    }
    return "";
}

/*
 * END UTILITY FUNCTIONS
 */

export const ArchWeekView = React.createClass({
    render: function() {
    	console.log(this.props)
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

			{this.props.tasks.map((t) => (<ArchTaskRow {...t} key = {t.id}/>))}

			<div id = "bottomBar" onClick = {null}>Week of {moment(this.props.weekDate).format('MM/DD/YYYY')}</div>
			</div>);
    }
})

const ArchTaskRow = React.createClass({
    render: function() {
        var tid = this.props.id;
        var name = this.props.name;
        var quant = <div className = "quant">{this.props.quant} {unitString(this.props.unit)}</div>;
        var buttonRow = this.props.daysDone.map((s, i) => (<ButtonBox 
        	s = {s} key = {i}/>));

        return (<div className="taskRow">
			<div className = "karmaFlair"/>
			<div className = "taskName">{name}{quant}</div>
			{buttonRow}
		</div>)
    }
})

const WeekView = React.createClass({
    render: function() {
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
    getInitialState: function() {
        return { editMode: false };
    },
    toggleEdit: function() {
        this.setState({
            editMode: !this.state.editMode
        });
    },
    keyPress: function(t) {
        if (t.charCode == 13)
            this.toggleEdit();
    },
    nameChange: function(e) {
        this.props.setName(this.props.id, e.target.value);
    },
    quantChange: function(e) {
        if (parseInt(e.target.value) > 0) {
            this.props.setQuant(this.props.id, parseInt(e.target.value));
        }
    },
    render: function() {
        var quant, buttonRow, name;
        var tid = this.props.id;
        //regular mode
        if (!this.state.editMode) {
            //name
            name = this.props.name;
            //quant
            var quantNum = this.props.unit > 0 ? this.props.quant : "";
            quant = <div className = "quant">{quantNum} {unitString(this.props.unit)}</div>;
            //buttons
            buttonRow = this.props.daysDone.map((s, i) => (<ButtonBox 
				onClick = {() => this.props.toggleDaysDone(tid, i)}
				e = {this.state.editMode} tid = {tid} 
				s = {s} key = {i} did = {i}/>));
        }
        //edit mode
        else {
            //name
            name = <input value = {this.props.name} onChange = {this.nameChange} onKeyPress={this.keyPress}/>;
            var cat = (catName) => {
                return <a href = "#" onClick = {()=>this.props.toggleUnit(tid)}>{catName}</a>
            };
            //quant
            var q = <input type = "number" value = {this.props.quant} 
            	onChange = {this.quantChange} onKeyPress={this.keyPress}/>
            switch (this.props.unit) {
                case 0:
                    quant = <div className = "quant">{cat("N/A")}</div>;
                    break;
                case 1:
                    quant = <div className = "quant">{q}{cat("reps")}</div>;
                    break;
                case 2:
                    quant = <div className = "quant">{q}{cat("mins")}</div>;
                    break;
            }
            //buttons
            buttonRow = this.props.activeDays.map((s, i) => (<ButtonBox 
				onClick = {() => this.props.toggleActiveDays(tid, i)}
				e = {this.state.editMode} tid = {tid} 
				s = {s ? 3:2} key = {i} did = {i}/>))
        }

        return (<div className="taskRow">
			<div className = "karmaFlair"/>
			<div className = "taskName">{name}{quant}</div>
			{buttonRow}
			<div className = "taskDelete" onClick = {()=>{this.props.removeTask(this.props.id)}}/>
			<div className = "taskEdit" onClick = {this.toggleEdit}/>
		</div>)
    }
})

const ButtonBox = React.createClass({
    render: function() {
        var cname = "bb";
        cname += " " + colorString(this.props.s)
        if (this.props.e) {
            cname += " bbor"
        }
        return (<div className = {cname} onClick = {this.props.onClick}></div>);
    }
})


export default WeekView;
