const database = require('./database');

class Elements {

    async getAllByTopics() {
        var sortedElements = [];
        var elementsQuery = await database.query('SELECT eId, label, sortIndex, state, tId FROM elements');

        elementsQuery.forEach(element => {
            var sortedElementIx = sortedElements.findIndex(e => e.tId === element.tId);

            var mainElement = {
                key: element.eId,
                label: element.label,
                state: Boolean(element.state),
                index: element.sortIndex,
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
        var elementsQuery = await database.query("SELECT eId AS 'key', label, state, sortIndex AS 'index' FROM elements WHERE tId = '" + topicId + "'");
        elementsQuery.forEach(function(e) {
             e.state = Boolean(e.state)
             return e;
        });
        return elementsQuery;
    }

    async find(params) {
        if (params.query.topic === undefined) {
            var elementsQuery = await database.query("SELECT eId AS 'key', tId AS 'topicKey', label, state, sortIndex AS 'index' FROM elements");
            elementsQuery.map(e => {
                e.state = Boolean(e.state)
                return e;
            });
            return { elements: elementsQuery };
        } else {
            return { elements: await this.getByTopic( Number(params.query.topic) ) };
        }
    }

    async get(id, params) {
        var elementsQuery = await database.query("SELECT eId AS 'key', label, state, sortIndex AS 'index' FROM elements WHERE eId = '" + id + "'");
        elementsQuery[0].state = Boolean(elementsQuery[0].state);
        return elementsQuery[0];
    }
}

module.exports = Elements;