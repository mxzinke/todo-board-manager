import React from 'react';
import '../../assets/styles/topics/ToDo.css';
import { PropTypes } from 'prop-types';
import DeleteButton from '../forms/DeleteButton';

/* @class ToDo-Element Component */
class ToDo extends React.Component {
  constructor(params) {
    super(params);
    this.key = params.componentId;
    this.label = params.label;
    this.status = Boolean(params.state);

    // Some function pointers from other components
    this.onChangeHandler = params.onChange;
    this.onDeleteHandler = params.onDelete;
  }

  render() {
    return (
      <div className="ToDoElement" id={`todo_${this.key}`}>
        <label className="container">
          {this.status === true ? (
            <span className="done">{this.label}</span>
          ) : (
            <span className="open">{this.label}</span>
          )}
          {this.status === true ? (
            <input
              type="checkbox"
              checked="checked"
              onChange={() => this.onChangeHandler()}
            />
          ) : (
            <input type="checkbox" onChange={() => this.onCheckboxChange()} />
          )}

          <span className="checkmark" />
        </label>
        <DeleteButton onClick={() => this.onDeleteHandler()} />
      </div>
    );
  }
}

ToDo.propType = {
  params: {
    componentId: PropTypes.number.required,
    label: PropTypes.string.required,
    onChange: PropTypes.func.required,
    onDelete: PropTypes.func.required
  }
};

export default ToDo;
