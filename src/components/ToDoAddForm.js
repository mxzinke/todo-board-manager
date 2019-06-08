import React from 'react';

export default class ToDoAddForm extends React.Component {
    
    constructor(params) {
        super(params);
        this.onAddElement = params.onAddElement;
    }

    onSubmitHandler()  {

    }

    render() {
        return (
            <div className="AddForm">
                <input className="InvisibleInput" type="text" placeholder="What do you have to do?"></input>
                <button type="submit" onClick={ () => this.onSubmitHandler() }></button>
            </div>
        )
    }
}
