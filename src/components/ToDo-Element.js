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
        console.log(this.id, params.state);
        this.status = Boolean(params.state);
    }

    render() {
        //console.log(this.id, this.status)
        return (
            <div className="ToDo-Element" id={"todo_" + this.id}>
                <label className="container">
                { this.label }
                { (this.status === "true") ? <input type="checkbox" checked="checked"/> : <input type="checkbox" /> }
                <span className="checkmark" />
                </label>
            </div>
        );
    }
}