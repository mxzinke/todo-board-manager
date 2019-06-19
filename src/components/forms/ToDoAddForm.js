import React from 'react';
import InvisibleInput from './InvisibleInput';
import AddButton from './AddButton';
import { onPressEnter } from '../../utils';

const NATIVE_PLACEHOLDER = 'Already everything done?';

export default class ToDoAddForm extends React.Component {
    
    constructor(params) {
        super(params);
        this.onAddElement = params.onAddElement;
        this.state = {
            inputValue: ''
        };
    }

    onSubmitHandler()  {
        if (this.hasInput()) {
            this.onAddElement(this.state.inputValue);
            this.resetInputField();
        }
    }

    onChangeHandler(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    render() {
        const value = this.state.inputValue;

        return (
            <div className="AddForm">
                {
                    InvisibleInput(value, NATIVE_PLACEHOLDER, {
                        onChange: (evt) => this.onChangeHandler(evt),
                        onKeyPress: (evt) => onPressEnter(evt, () => this.onSubmitHandler())
                    })
                }{
                    AddButton({
                        onClick: () => this.onSubmitHandler()
                    })
                }
            </div>
        );
    }

    hasInput() {
        const NO_INPUT = 0;
        return (this.state.inputValue.length > NO_INPUT);
    }

    resetInputField() {
        this.setState({
            inputValue: ''
        });
    }
}
