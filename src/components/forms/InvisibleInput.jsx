import React from 'react';
import { PropTypes } from 'prop-types';

// This Input has no surrounding by a border.
function InvisibleInput(props) {
  return (
    <input
      type="text"
      className="InvisibleInput"
      placeholder={props.placeholder}
      value={props.value}
      // DOM Events:
      onChange={props.actions.onChange}
      onKeyPress={props.actions.onKeyPress}
      onFocus={props.actions.onFocus}
      onBlur={props.actions.onBlur}
    />
  );
}

InvisibleInput.propTypes = {
  // is required
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

  // for dom-events
  actions: PropTypes.objectOf(PropTypes.func)
};

export default InvisibleInput;
