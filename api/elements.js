const database = require('./database');

class Elements {

    async getAllByTopics() {
        var sortedElements = [];
        var elementsQuery = await database.query('SELECT eId, label, sortIndex, tId FROM elements');

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

    async getByTopic(topicId) {
        var elementsQuery = await database.query("SELECT eId AS 'key', label, sortIndex AS 'index' FROM elements WHERE tId = '" + topicId + "'");
        return elementsQuery;
    }

    async find(params) {

        console.log(params);
        if (params.query.topic === undefined) {
            var elementsQuery = await database.query("SELECT eId AS 'key', tId AS 'topicId', label, sortIndex AS 'index' FROM elements");
            return { elements: elementsQuery };
        } else {
            return { elements: await this.getByTopic( Number(params.query.topic) ) };
        }
    }

    async get(id, params) {
        var elementsQuery = await database.query("SELECT eId AS 'key', label, sortIndex AS 'index' FROM elements WHERE eId = '" + id + "'");
        return elementsQuery[0];
    }
}

module.exports = Elements;