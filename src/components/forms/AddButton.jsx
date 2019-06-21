import React from 'react';
import { PropTypes } from 'prop-types';

function AddButton({ onClick }) {
  const BUTTON_CONTENT = '+';

  return (
    <button type="button" className="AddButton" onClick={onClick}>
      {BUTTON_CONTENT}
    </button>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func
};

AddButton.defaultProps = {
  onClick: () => {}
};

export default AddButton;
