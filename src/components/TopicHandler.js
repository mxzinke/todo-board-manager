import React from 'react';
import Topic from './Topic';
import { topicsService, socket } from './../connector';
import LoadingElement from './LoadingElement';

export default class TopicHandler extends React.Component {
    
    constructor() {
        super();
        this.state = {};

        // Loading content
        this.syncTopics();

        socket.on('topics created', () => this.syncTopics());
        socket.on('topics removed', result => {
            if (result !== undefined) {
                var topics = this.state.topics;
                var topicIx = topics.findIndex(e => e !== undefined && e.key === result.key);
                
                if (topicIx !== -1) {
                    delete topics[topicIx];
                    topics = topics.filter( (n) => { return n !== undefined } );
                    this.setState(topics);
                } else {
                    this.syncTopics();
                }
            }
        });
    }

    async syncTopics() {
        try {
            topicsService.find( { query: { withoutElements: 1, withoutTitle: 1 }}).then( result => {
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
                var topicIx = topics.findIndex(e => e !== undefined && e.key === result.key);
                
                if (topicIx !== -1) {
                    delete topics[topicIx];
                    topics = topics.filter( (n) => { return n !== undefined } );
                    this.setState(topics);
                } else {
                    this.syncTopics();
                }
            } else {
                console.log("This element was already deleted.");
            }
        });

        
    }

    /* @function Adding a new ToDo Element to the "Open"-Field
     * @param newLabel the new Label for the To-Do-Element
     * This function is causing a new state and re-rendering */
    addTopic() {
        var topics = this.state.topics;

        topicsService.create({}).then( result => {
            topics.push(result);

            this.setState({
                topics: topics
            });
        });
    }

    render() {
        if (this.state.topics !== undefined) {
            var Topics = ( this.state.topics.map( (topic) =>
            <Topic key={"topic_" + topic.key} dataKey={topic.key}
            onDeleteHandler={ (tKey) => this.deleteTopic(tKey) } onIssueRefresh={ () => this.syncTopics() } />) );

            return (
                <div className="Topics">
                    { Topics }
                    <button className="AddButton" type="submit" onClick={ () => this.addTopic() }>+</button>
                </div>
            );
        } else {
            return (
                <div className="Topics">
                    <LoadingElement />
                </div>
            );
        }    
    }
}
