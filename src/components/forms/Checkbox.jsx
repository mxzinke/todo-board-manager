import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({ htmlFor, status, label, onChange }) {
  const state = status === true ? 'done' : 'open';
  const checkedProp = status === true ? 'checked' : '';

  return (
    <label htmlFor={htmlFor} className="container">
      <span className={state}>{label}</span>
      <input type="checkbox" checked={checkedProp} onChange={onChange} />
      <span className="checkmark" />
    </label>
  );
}

Checkbox.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  label: '',
  onChange: () => {}
};

export default Checkbox;
