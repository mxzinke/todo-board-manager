import React from 'react';
import PropTypes from 'prop-types';

// This Input has no surrounding by a border.
function InvisibleInput(value, placeholder, actions) {
    return (
        <input type="text"
            className="InvisibleInput"
            placeholder={ placeholder }
            value={ value }
            onChange={ actions.onChange }
            onKeyPress={ actions.onKeyPress }
            onFocus={ actions.onFocus }
            onBlur={ actions.onBlur }
        />
    );
}

InvisibleInput.propTypes = {
    // is required
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,

    // if you want some actions at DOM-Events
    actions: PropTypes.objectOf(PropTypes.func)
};

export default InvisibleInput;
