const database = require('./database');
const errors = require('@feathersjs/errors');

class Elements {

    async getAllByTopics() {
        var sortedElements = [];
        var elementsQuery = await database.query("SELECT eId AS 'key', label, sortIndex AS 'index', state, tId AS 'topicKey' FROM elements");

        elementsQuery.forEach(element => {
            var sortedElementIx = sortedElements.findIndex(e => e.topicKey === element.topicKey);

            element.state = Boolean(element.state)

            if (sortedElementIx === -1) {
                sortedElements.push({
                    topicKey: element.topicKey,
                    elements: [element]
                });
            } else {
                sortedElements[sortedElementIx].elements.push(element);
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
        var elementsQuery = await database.query("SELECT eId AS 'key', tId AS 'topicKey', label, state, sortIndex AS 'index' FROM elements WHERE eId = '" + id + "'");
        if (elementsQuery.length > 0) {
            elementsQuery[0].state = Boolean(elementsQuery[0].state);
            return elementsQuery[0];
        } else {
            return null
        }
    }

    async create(data, params) {
        if (data.label === undefined || data.topicKey === undefined) {
            return undefined;
        }

        var keyFinder = await database.query("SELECT MAX(eId) AS 'maxEId' FROM elements");
        var indexFinder = await database.query("SELECT MAX(sortIndex) AS 'maxSortIndex' FROM elements WHERE tId = '" + data.topicKey + "'");
        var newKey = Number(keyFinder[0].maxEId) + 1;
        var newSortIndex = Number(indexFinder[0].maxSortIndex) + 1;

        await database.query("INSERT INTO elements (eId, sortIndex, label, state, tId) VALUES ('" + newKey + "', '" + newSortIndex + "', '" + data.label + "', '0', '" + data.topicKey + "')");

        return await this.get(newKey);
    }

    async patch(id, data, params) {
        var result = await this.get(id)

        if (params.query.switchState !== undefined && params.query.switchState !== 0) {
            const newState = Number(!( result.state ));
            database.query("UPDATE elements SET state = '" + newState + "' WHERE elements.eId = '" + id + "'");
            result.state = newState;
        }

        if (data.state !== undefined) {
            database.query("UPDATE elements SET state = '" + data.state + "' WHERE elements.eId = '" + id + "'");
            result.state = data.state;
        }

        if (data.index !== undefined) {
            database.query("UPDATE elements SET sortIndex = '" + data.index + "' WHERE elements.eId = '" + id + "'");
            result.index = data.index;
        }

        return result;
    }

    async remove(id, params) {
        if (id !== null) {
            var removedItem = await this.get(id);

            if (removedItem !== undefined) {
                database.query("DELETE FROM elements WHERE eId = '" + id + "'");
                return removedItem;
            } else {
                return null;
            }
        }
    }
}

module.exports = Elements;