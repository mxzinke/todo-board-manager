import React from 'react';
import { PropTypes } from 'prop-types';
import deleteIcon from '../../assets/icons/actions/delete.svg';

function DeleteButton(actions) {
  const DELETE_ICON = <img src={deleteIcon} alt="Delete" />;

  return (
    <button type="button" className="DeleteButton" onClick={actions.onClick}>
      {DELETE_ICON}
    </button>
  );
}

DeleteButton.propType = {
  actions: PropTypes.objectOf(PropTypes.func)
};

export default DeleteButton;
