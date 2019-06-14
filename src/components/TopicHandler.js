import React from 'react';
import Topic from './Topic';
import { topicsService } from './../connector';
import LoadingElement from './LoadingElement';

export default class TopicHandler extends React.Component {
    
    constructor() {
        super();
        this.state = {};

        // Loading content
        this.doRequestOnTopics();
    }

    async doRequestOnTopics() {
        try {
            topicsService.find( { query: {}}).then( result => {
                this.setState(result);
            });
        } catch(e) {
            console.log("Error at entrypoint /topics:", e);
        }
    }

    /* @function Deleting one whole topic
     * @param Topic The unique key of the topic (saved in the this.state.topics)
     * This function is causing a new state and re-rendering (if confirmed) */
    deleteTopic(topicKey) {
        if (!window.confirm("Do you really want to 𝗱𝗲𝗹𝗲𝘁𝗲 this Topic forever (a very long time)?")) {
            return null;
        }

        topicsService.remove(topicKey).then( result => {
            if (result !== undefined) {
                var topics = this.state.topics;
                var topicIx = topics.findIndex(e => e.key === result.key);
                
                if (topicIx !== -1) {
                    delete topics[topicIx];
                    topics = topics.filter( (n) => { return n !== undefined } );
                    this.setState(topics);
                } else {
                    throw new Error("The Topic could not be found in the in the state-list.");
                }
            }
        });

        
    }

    /* @function Adding a new ToDo Element to the "Open"-Field
     * @param newLabel the new Label for the To-Do-Element
     * This function is causing a new state and re-rendering */
    addTopic() {
        var topics = this.state.topics;

        var checkNewKey = (newKey) => {return (topics.some(e => e.key === newKey) || newKey === 0) }

        var min = 10000000;
        var max = 99999999;
        var newKey = 0;
        do {
            newKey = Math.round(Math.random() * (max - min)) + min;
        } while (checkNewKey(newKey));

        var freeIx = 0
        topics.forEach(e => { freeIx = (e.index > freeIx) ? e.index : freeIx +1 });

        topics.push({
            key: newKey,
            index: freeIx
        });

        this.setState({
            topics: topics
        });
    }

    renderTopics() {
        if (this.state.topics !== undefined) {
            return ( this.state.topics.map( (topic) =>
            <Topic key={"topic_" + topic.key} dataKey={topic.key}
            onDeleteHandler={ (tKey) => this.deleteTopic(tKey) } />) );
        } else {
            return (<LoadingElement />);
        }      
    }

    render() {
        return (
            <div className="Topics">
                { this.renderTopics() }
                <button className="AddButton" type="submit" onClick={ () => this.addTopic() }>+</button>
            </div>
        )
    }
}
