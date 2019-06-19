import { PropTypes } from 'prop-types';


function onPressEnter(eventObject, callback) {
    if (eventObject.key === 'Enter') {
        callback();
    }
}

onPressEnter.propTypes = {
    eventObject: PropTypes.object,
    callback: PropTypes.func
};

export { onPressEnter };