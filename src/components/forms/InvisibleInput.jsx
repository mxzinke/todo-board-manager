import React from 'react';
import { PropTypes } from 'prop-types';

// This Input has no surrounding by a border.
function InvisibleInput({
  value,
  placeholder,
  onChange,
  onKeyPress,
  onBlur,
  onFocus
}) {
  return (
    <input
      type="text"
      className="InvisibleInput"
      placeholder={placeholder}
      value={value}
      // DOM Events:
      onChange={onChange}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

InvisibleInput.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

InvisibleInput.defaultProps = {
  value: '',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyPress: () => {}
};

export default InvisibleInput;
