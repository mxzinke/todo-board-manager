import React from 'react';
import { PropTypes } from 'prop-types';
import deleteIcon from '../../assets/icons/actions/delete.svg';

function DeleteButton({ onClick }) {
  const BUTTON_CONTENT = <img src={deleteIcon} alt="Delete" />;

  return (
    <button type="button" className="DeleteButton" onClick={onClick}>
      {BUTTON_CONTENT}
    </button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func
};

DeleteButton.defaultProps = {
  onClick: () => {}
};

export default DeleteButton;
