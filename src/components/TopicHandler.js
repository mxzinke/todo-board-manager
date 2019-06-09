import React from 'react';
import Topic from './Topic';

export default class TopicHandler extends React.Component {
    
    constructor() {
        super();
        this.state = [12345678, 25151656];
    }

    deleteTopic(topicId) {
        var topics = this.state;
        var topicIx = topics.indexOf(element => element === topicId);
        
        delete topics[topicIx];
        topics = topics.filter( n => { return n !== undefined } );
        this.setState(topics);
    }

    render() {
        return (
            <div className="Topics">
                {this.state.map(topicId => <Topic id={topicId} onDeleteHandler={ (topicId) => this.deleteTopic(topicId) } />)}
            </div>
        )
    }
}
