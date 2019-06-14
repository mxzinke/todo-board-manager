const database = require('./database');
const elements = require('./elements');

class Topics {

    constructor() {
        this.Elements = new elements();
    }

    async find(params) {
        var topicQuery;
        var allTopics;

        if (params.query.withoutTitle === undefined) {
            topicQuery = await database.query("SELECT tId AS 'key', title, sortIndex AS 'index' FROM topics");
        } else {
            topicQuery = await database.query("SELECT tId AS 'key', sortIndex AS 'index' FROM topics");
        }

        if (params.query.withoutElements === undefined) {
            var sortedElements = await this.Elements.getAllByTopics();
            allTopics = { topics: topicQuery };
            allTopics.topics.forEach((row, index) => {
                var relevantIx = sortedElements.findIndex(e => e.topicKey === row.key);
                
                var relevantEle = (relevantIx !== -1) ? sortedElements[relevantIx].elements : [];

                allTopics.topics[index].elements = relevantEle;
            });
            
        } else {
            allTopics = { topics: topicQuery };            
        }

        return allTopics;
    }

    async get(id, params) {
        var topicQuery = await database.query("SELECT tId AS 'key', title, sortIndex AS 'index' FROM topics WHERE tId = '" + id + "'");

        if (topicQuery.length === 1) {
            topicQuery[0].elements = await this.Elements.getByTopic(id);
            return topicQuery[0];
        } else {
            return null;
        }
    }

    async create(data, params) {
        var title = (data.title !== undefined) ? data.title : "";
        var indexFinder = await database.query("SELECT MAX(sortIndex) AS 'maxSortIndex', MAX(tId) AS 'maxTId' FROM topics")

        var newKey = Number(indexFinder[0].maxTId) + 1;
        var newSortIndex = Number(indexFinder[0].maxSortIndex) + 1;

        await database.query("INSERT INTO topics (tId, sortIndex, title) VALUES ('" + newKey + "', '" + newSortIndex + "', '" + title + "')");

        return await this.get(newKey);
    }

    async patch(id, data, params) {
        if (data.title !== undefined) {
            database.query("UPDATE topics SET title = '" + data.title + "' WHERE topics.tId = '" + id + "'");
        }

        if (data.index !== undefined) {
            database.query("UPDATE topics SET sortIndex = '" + data.index + "' WHERE topics.tId = '" + id + "'");
        }

        return await this.get(id);
    }

    async remove(id, params) {
        if (id !== null) {
            var removedItem = await this.get(id);

            if (removedItem !== undefined) {
                database.query("DELETE FROM topics WHERE tId = '" + id + "'");
                database.query("DELETE FROM elements WHERE tId = '" + id + "'");
                return removedItem;
            } else {
                return null;
            }
        }
    }
}

module.exports = Topics;