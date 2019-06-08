import React from 'react';
import ToDoElement from './ToDo-Element';
import '../assets/styles/ToDo-Topic.css';
//import Api from '../Api';

/* @class Generating the topic based overview of the To-Do's 
 * @param id For generating DOM-Id and API-Request */
export default class Topic extends React.Component {

    constructor(params) {
        super(params);
        this.componentId = "topic-" + params.id;
        this.topicId = params.id;
    }

    getAllOpenToDoElements() {
        return this._requestOpenToDos().forEach(element =>  {
            return <ToDoElement id={element.id} label={element.label} state={false} />
        })
    }

    render() {
        return (
            <div className="Topic" id={this.componentId}>
                <div className="TopicTitle">{this._getTitle()}</div>
                <div className="ToDoElements" id="openToDo">
                    <h2>Open ToDo's:</h2>
                    <ToDoElement id={1} label={"Das ist nicht entfernbar"} state={false} />
                    { this.getAllOpenToDoElements() }
                </div>
                <div className="ToDoElements" id="doneToDo">
                    <h2>Done ToDo's:</h2>
                    <ToDoElement id={2} label={"Das ist nicht entfernbar"} state={true} />
                    {
                        this._requestClosedToDos().forEach(element =>  {
                            return(<ToDoElement id={element.id} label={element.label} state={true} />);
                        })
                    }
                </div>
            </div>
        );
    }

    /* TODO: The following functions have to be connect to API @important */

    /* private @function Loads all not done ToDo's by the actual topic from API */
    _requestOpenToDos() {
        var apiAnswer = [
            {
                id: 124223322344,
                label: "Improve Webdesign",
                index: 0
            },
            {
                id: 190929393912,
                label: "Setup the RESTful-API",
                index: 1
            },
            {
                id: 123929292992,
                label: "Implement RESTful-API Access",
                index: 2
            }
        ];

        //var apiAnswer = Api.doRequest("topic/" + this.topicId + "?state=false", "GET");

        return apiAnswer;
    }

    /* private @function Loads all done ToDo's by the actual topic from API */
    _requestClosedToDos() {
        return [
            {
                id: 212444324344,
                label: "Adding basic React Components",
                index: 3
            }
        ];

        //var apiAnswer = Api.doRequest("topic/" + this.topicId + "?state=false", "GET");
    }

    /* @function Loads the title of the topic from API */
    _getTitle() {
        return "Project: ToDo-Manager";

        //var apiAnswer = Api.doRequest("topic/" + this.topicId + "/title", "GET");
    }
}