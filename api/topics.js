const database = require('./database');
const elements = require('./elements');

class Topics {

    constructor() {
        this.Elements = new elements();
    }

    async find(params) {
        var sortedElements = await this.Elements.getAllByTopics();
        var allTopics = { topics: [] };

        var topicQuery = await database.query('SELECT tId, title, sortIndex FROM topics');

        topicQuery.forEach(row => {
            var relevantElements = sortedElements.filter(e => e.tId === row.tId);

            allTopics.topics.push({
                key: row.tId,
                title: row.title,
                index: row.sortIndex,
                elements: relevantElements[0].elements
            });
        });

        return allTopics;
    }

    async get(id, params) {
        var topicQuery = await database.query("SELECT tId AS 'key', title, sortIndex AS 'index' FROM topics WHERE tId = '" + id + "'");

        topicQuery[0].elements = await this.Elements.getByTopic(id)

        return topicQuery[0];
    }
}

module.exports = Topics;