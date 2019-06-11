const database = require('./database');

class Elements {

    async find() {
        var sortedElements = [];
        var elementsQuery = await database.query('SELECT eId, label, sortIndex, tId FROM elements')

        elementsQuery.forEach(element => {
            var sortedElementIx = sortedElements.findIndex(e => e.tId === element.tId);

            var mainElement = {
                key: element.eId,
                label: element.label,
                index: element.sortIndex
            };

            if (sortedElementIx === -1) {
                sortedElements.push({
                    tId: element.tId,
                    elements: [mainElement]
                });
            } else {
                sortedElements[sortedElementIx].elements.push(mainElement);
            }
        });

        return sortedElements;
    } 
}

module.exports = Elements;