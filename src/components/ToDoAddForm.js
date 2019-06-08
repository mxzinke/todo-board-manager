import React from 'react';

export default class ToDoAddForm extends React.Component {
    
    constructor(params) {
        super(params);
        this.onAddElement = params.onAddElement;
        this.state = {
            inputValue: ''
        };
    }

    onSubmitHandler()  {
        if (this.state.inputValue.length > 0) { this.onAddElement(this.state.inputValue); }
        
        this.setState({
            inputValue: ''
        })
    }

    onChangeHandler(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        return (
            <div className="AddForm">
                <input className="InvisibleInput" type="text" value={ this.state.inputValue } onChange={ (evt) => this.onChangeHandler(evt) } placeholder="What do you have to do?"></input>
                <button className="AddButton" type="submit" onClick={ () => this.onSubmitHandler() }>+</button>
            </div>
        )
    }
}