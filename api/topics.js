const database = require('./database');

class Topics {

    async find() {
        var sortedElements = [];
        var allTopics = { topics: [] };
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
}

module.exports = Topics;