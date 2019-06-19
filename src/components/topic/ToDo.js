import React from 'react';
import deleteIcon from '../../assets/icons/actions/delete.svg';
import '../../assets/styles/topics/ToDo.css';


/* @class ToDo-Element Component
 * @param id Out of the API-Database and reused in DOM
 * @param label Content of the ToDo-Element */
export default class ToDo extends React.Component {
    
    constructor(params) {
        super(params);
        this.key = params.dataKey;
        this.label = params.label;
        this.status = Boolean(params.state);
        this.onChangeHandler = params.onChangeHandler;
        this.onDeleteHandler = params.onDeleteHandler;
    }

    onCheckboxChange() {
        this.onChangeHandler();
        //this.status = !this.status;
    }

    render() {
        return (
            <div className="ToDoElement" id={'todo_' + this.key}>
                <label className="container">
                    { (this.status === true) ? <span className="done">{ this.label }</span> : <span className="open">{ this.label }</span> } 
                    { (this.status === true) ? <input type="checkbox" checked="checked" onChange={ () => this.onCheckboxChange() } />
                    : <input type="checkbox" onChange={ () => this.onCheckboxChange() } /> }

                    <span className="checkmark" />
                    <button className="DeleteButton" type="button" onClick={ () => this.onDeleteHandler() }><img src={deleteIcon} alt="Delete" /></button>
                </label>
            </div>
        );
    }
}