import React from 'react';
import Topic from './Topic';

export default class TopicHandler extends React.Component {
    
    constructor() {
        super();
        this.state = {
            topics: [12345678, 25151656]
        };
    }

    deleteTopic(topicId) {
        if (!window.confirm("Do you really want to 𝗱𝗲𝗹𝗲𝘁𝗲 this Topic forever (a very long time)?")) {
            return null;
        }

        var topics = this.state.topics;
        var topicIx = topics.findIndex(e => e === topicId);
        
        if (topicIx !== -1) {
            delete topics[topicIx];
            topics = topics.filter( n => { return n !== undefined } );
            this.setState({
                topics: topics
            });
        } else {
            throw new Error("The Topic could not be found in the in the state-list.");
        }
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
