import React from 'react';
import PropTypes from 'prop-types';

function AddButton(actions) {
    const BUTTON_LABEL = '+';

    return (
        <button type="submit"
            className="AddButton"
            onClick={ actions.onClick }
            >{ BUTTON_LABEL }
        </button>
    );
}

AddButton.propTypes = {
    // if you want some actions at DOM-Events
    actions: PropTypes.objectOf(PropTypes.func)
};

export default AddButton;

