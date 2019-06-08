import React from 'react';
import ToDoElement from './ToDo-Element';
import '../assets/styles/ToDo-Topic.css';
//import Api from '../Api';

/* @class Generating the topic based overview of the To-Do's 
 * @param key For generating DOM-Id and the ID for API-Request */
export default class Topic extends React.Component {

    constructor(params) {
        super(params);
        this.componentId = "topic_" + params.id;
        this.topicId = params.id;
        this.state = {
            title: "The Title Project",
            open: [
                {
                    id: 124223322344,
                    label: "Improve Design",
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
            ],
            done: [
                {
                    id: 212444324344,
                    label: "Adding basic React Components",
                    index: 0
                }
            ]
        };
    }

    /* @function Changing the State of a Element: done ←→ open
     * @param elementId The Id of the Id which want to move
     * @return true/false → if successful or not */
    changeStateOfElement(elementId) {
        var state = null;
        var element = null;
        var todoElements = this.state;
        var elementIndex = null;

        if (todoElements.open.some(e => e.id === elementId)) {
            state = false;
            element = todoElements.open.find(e => e.id === elementId);
            elementIndex = todoElements.open.indexOf(element);
        } else if (todoElements.done.some(e => e.id === elementId)) {
            state = true;
            element = todoElements.done.find(e => e.id === elementId);
            elementIndex = todoElements.done.indexOf(element);
        } else {
            throw new Error("The Element searching for was not found!");
        }

        console.log("ElementIndex", element);

        var highestIx = 0;

        if (!state) {
            // fixing up the index
            todoElements.done.forEach(e => {
                if (e.index > highestIx) { highestIx = e.index }
            });
            element.index = highestIx;
            

            // Add to new list and delete old element
            todoElements.done.push(element);
            delete todoElements.open[elementIndex];
        } else {
            // fixing up the index
            todoElements.open.forEach(e => {
                if (e.index > highestIx) { highestIx = e.index }
            });
            element.index = highestIx;

            // Add to new list and delete old element
            todoElements.open.push(element);
            delete todoElements.done[elementIndex];
        }

        this.setState(todoElements);
    }

    render() {
        return (
            <div className="Topic" id={this.componentId}>
                <div className="TopicTitle">{this.title}</div>
                <div className="ToDoElements openToDo">
                    <h2>Open ToDos:</h2>
                    {
                        this.state.open.map(
                            element => <ToDoElement onChangeHandler={() => this.changeStateOfElement(element.id)} key={element.id} id={element.id} label={element.label} state={false} />)}
                </div>
                <div className="ToDoElements doneToDo">
                    <h2>Done ToDos:</h2>
                    {
                        this.state.done.map(
                            element => <ToDoElement onChangeHandler={() => this.changeStateOfElement(element.id)} key={element.id} id={element.id} label={element.label} state={true} />)}
                </div>
            </div>
        );
    }

    /* TODO: The following functions have to be connect to API @important */

    /* @function For syncing the API with the local cache/storage
     * If some changes were detected the application has to re-render */
    syncToDoTopic() {
        // Create Algorithm for syncing the API with local container (also title!)

        //var apiAnswer = Api.doRequest("topic/" + this.topicId + "?state=false", "GET");
        //var apiAnswer = Api.doRequest("topic/" + this.topicId + "?state=false", "GET");
    }
}