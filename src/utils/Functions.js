// Global used functions/prototypes

export function cleanUp(array) {
    if (!Array.isArray(array)) {
        throw new Error('Non-Arrays can not be cleaned up!');
    }

    return array.filter( (element) => {
        return (element !== undefined && element !== null);
    });
};
