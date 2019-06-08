import React from 'react'
import '../assets/styles/ToDo-Element.css';

/* @class ToDo-Element Component
 * @param id Out of the API-Database and reused in DOM
 * @param label Content of the ToDo-Element */
export default class ToDoElement extends React.Component {
    
    constructor(params) {
        super(params);
        this.key = params.key;
        this.id = params.id;
        this.label = params.label;
        this.status = Boolean(params.state);
        this.onChangeHandler = params.onChangeHandler;
    }

    onCheckboxChange() {
        this.onChangeHandler();
        this.status = !this.status;
    }

    render() {
        return (
            <div className="ToDo-Element" id={"todo_" + this.key}>
                <label className="container">
                    { (this.status === true) ? <span className="done">{ this.label }</span> : <span className="open">{ this.label }</span> } 
                    { (this.status === true) ? 
                    <input type="checkbox" checked="checked" onChange={ event => this.onCheckboxChange() } />
                    : <input type="checkbox" onChange={ event => this.onCheckboxChange() } /> }

                    <span className="checkmark" />
                </label>
            </div>
        );
    }
}