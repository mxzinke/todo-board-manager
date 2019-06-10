import React from 'react';
import Topic from './Topic';

export default class TopicHandler extends React.Component {
    
    constructor() {
        super();
        this.state = {
            topics: [
                {
                    id: 12345678,
                    index: 0
                },
                {
                    id: 25151656,
                    index: 1
                }
            ]
        };
    }

    /* @function Deleting one whole topic
     * @param topicId The unique Id of the topic (saved in the this.state.topics)
     * This function is causing a new state and re-rendering (if confirmed) */
    deleteTopic(topicId) {
        if (!window.confirm("Do you really want to 𝗱𝗲𝗹𝗲𝘁𝗲 this Topic forever (a very long time)?")) {
            return null;
        }

        console.log(topicId, this.state.topics);

        var topics = this.state.topics;
        var topicIx = topics.findIndex(e => e.id === topicId.id);
        
        if (topicIx !== -1) {
            delete topics[topicIx];
            topics = topics.filter( (n) => { return n !== undefined } );
            this.setState({
                topics: topics
            });
        } else {
            throw new Error("The Topic could not be found in the in the state-list.");
        }
    }

    /* @function Adding a new ToDo Element to the "Open"-Field
     * @param newLabel the new Label for the To-Do-Element
     * This function is causing a new state and re-rendering */
    addTopic() {
        var topics = this.state.topics;

        var checkNewId = (nid) => {return (topics.some(e => e.id === nid) || nid === 0) }

        var min = 10000000;
        var max = 99999999;
        var nid = 0;
        do {
            nid = Math.round(Math.random() * (max - min)) + min;
        } while (checkNewId(nid));

        var freeIx = 0
        topics.forEach(e => { freeIx = (e.index > freeIx) ? e.index : freeIx +1 });

        topics.push({
            id: nid,
            index: freeIx
        });

        this.setState({
            topics: topics
        });
    }

    render() {
        return (
            <div className="Topics">
                {this.state.topics.map(topicId => <Topic id={topicId} onDeleteHandler={ (topicId) => this.deleteTopic(topicId) } />)}
                <button className="AddButton" type="submit" onClick={ () => this.addTopic() }>+</button>
            </div>
        )
    }
}
