import React from 'react';
import '../assets/styles/ToDo-Topic.css';

/* @class Generating the topic based overview of the To-Do's 
 * @param id For generating DOM-Id and API-Request */
export default class Topic extends React.Component {
    constructor(params) {
        super(params);
        this.componentId = "topic-" + params.id;
        this.topicId = params.id;
        this._openToDoElements = this._loadOpenToDos();
    }

    private loadOpenToDos() {
        return {};
    }

    render() {
        return (
            <div className="Topic" id={this.componentId}>

            </div>
        );
    }
}