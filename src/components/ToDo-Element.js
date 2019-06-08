import React from 'react'
import '../assets/styles/ToDo-Element.css';

/* @class ToDo-Element Component
 * @param id Out of the API-Database and reused in DOM
 * @param label Content of the ToDo-Element */
export default class ToDoElement extends React.Component {
    
    constructor(params) {
        super(params);
        this.id = params.id;
        this.label = params.label;
        this.status = Boolean(params.state);
    }

    onCheckboxChange() {
        return null;
    }

    render() {
        //console.log(this.id, this.status)
        return (
            <div className="ToDo-Element" id={"todo_" + this.id}>
                <label className="container">
                    { (this.status === true) ? <span className="done">{ this.label }</span> : <span className="open">{ this.label }</span> } 
                    { (this.status === true) ? <input type="checkbox" checked="checked" onChange={ event => this.onCheckboxChange() } /> : <input type="checkbox" onChange={ event => this.onCheckboxChange() } /> }
                    <span className="checkmark" />
                </label>
            </div>
        );
    }
}