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

  onSubmitHandler() {
    const { inputValue } = this.state.inputValue;

    if (this.hasInput()) {
      this.onAddElement(inputValue);
      this.resetInputField();
    }
  }

  onChangeHandler(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  hasInput() {
    const NO_INPUT = 0;
    const { inputValue } = this.state.inputValue;

    return inputValue.length > NO_INPUT;
  }

  resetInputField() {
    this.setState({
      inputValue: ''
    });
  }

  render() {
    return (
      <div className="AddForm">
        <InvisibleInput
          value={this.state.inputValue}
          label={NATIVE_PLACEHOLDER}
          onChange={(evt) => this.onChangeHandler(evt)}
          onKeyPress={(evt) => onPressEnter(evt, () => this.onSubmitHandler())}
        />
        <AddButton onClick={() => this.onSubmitHandler()} />
      </div>
    );
  }
}
