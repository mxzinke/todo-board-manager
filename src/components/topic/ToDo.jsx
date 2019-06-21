import React from 'react';
import '../../assets/styles/topics/ToDo.css';
import { PropTypes } from 'prop-types';
import DeleteButton from '../forms/DeleteButton';
import Checkbox from '../forms/Checkbox';

/* @class ToDo-Element Component */
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    const { componentId, label, state, onChange, onDelete } = props;

    this.state = {
      id: componentId,
      value: label,
      doneState: state,
      onChangeHandler: onChange,
      onDeleteHandler: onDelete
    };
  }

  render() {
    const todoId = `todo_${this.state.id}`;

    return (
      <div className="ToDoElement" id={todoId}>
        <Checkbox
          htmlFor={todoId}
          status={this.state.doneState}
          label={this.state.value}
          onChange={() => this.state.onChangeHandler()}
        />
        <DeleteButton onClick={() => this.state.onDeleteHandler()} />
      </div>
    );
  }
}

ToDo.propTypes = {
  componentId: PropTypes.number.isRequired,
  state: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func
};

ToDo.defaultProps = {
  label: '',
  onChange: () => {},
  onDelete: () => {}
};

export default ToDo;
