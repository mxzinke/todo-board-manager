import React from 'react';
import ToDoElement from './ToDoElement';
import '../assets/styles/Topic.css';
import deleteIcon from '../assets/icons/delete.svg';
import ToDoAddForm from './ToDoAddForm';
import { delEmptyArrayFields } from '../App';
//import Api from '../Api';

/* @class Generating the topic based overview of the To-Do's 
 * @param key For generating DOM-key and the key for API-Request */
export default class Topic extends React.Component {

    constructor(params) {
        super(params);
        this.componentKey = params.dataKey;
        this.key = params.dataKey;
        this.state = {
            title: "The Title Project",
            open: [
                {
                    key: 124223322344,
                    label: "Improve Design",
                    index: 0
                },
                {
                    key: 190929393912,
                    label: "Setup the RESTful-API",
                    index: 1
                },
                {
                    key: 123929292992,
                    label: "Implement RESTful-API Access",
                    index: 2
                }
            ],
            done: [
                {
                    key: 212444324344,
                    label: "Adding basic React Components",
                    index: 0
                }
            ]
        };
        this.onDeleteHandler = params.onDeleteHandler;
    }

    /* @function Changing the State of a Element: done ←→ open
     * @param elementKey The key of the key which want to move
     * This function is causing a new state and re-rendering */
    changeStateOfElement(elementKey) {
        var todoElements = this.state;

        
        var state = todoElements.done.some(e => e.key === elementKey);
        var selElem = (state) ? todoElements.done : todoElements.open;
        var elementIx = selElem.findIndex(el => el.key === elementKey);
        var element = selElem[elementIx];

        var highestIx = 0;

        if (!state) {
            todoElements.done.forEach(e => { highestIx = (e.index > highestIx) ? e.index : highestIx });
            element.index = highestIx + 1;
            
            todoElements.done.push(element);
            delete todoElements.open[elementIx];
            todoElements.open = delEmptyArrayFields(todoElements.open);
        } else {
            todoElements.open.forEach(e => { highestIx = (e.index > highestIx) ? e.index : highestIx });
            element.index = highestIx + 1;

            todoElements.open.push(element);
            delete todoElements.done[elementIx];
            todoElements.done = delEmptyArrayFields(todoElements.done);
        }

        this.setState(todoElements);
    }

    /* @function Adding a new ToDo Element to the "Open"-Field
     * @param newLabel the new Label for the To-Do-Element
     * This function is causing a new state and re-rendering */
    addElement(newLabel) {
        var todoElements = this.state;

        var highestIx = 0;
        todoElements.open.forEach(e => { highestIx = (e.index > highestIx) ? e.index : highestIx });

        var checkNewKey = (newKey) => {return (todoElements.open.some(e => e.key === newKey) || todoElements.done.some(e => e.key === newKey) || newKey === 0) }

        var min = 100000000000;
        var max = 999999999999;
        var newKey = 0;
        do {
            newKey = Math.round(Math.random() * (max - min)) + min;
        } while (checkNewKey(newKey));

        var newElement = {
            key: newKey,
            label: newLabel,
            index: highestIx + 1
        }

        todoElements.open.push(newElement);
        this.setState(todoElements);
    }

    /* @function Deleting a ToDo-Element
     * @param elementKey The key of the ToDoElement of the topics list
     * This function is causing a new state and re-rendering */
    delElement(elementKey) {
        var todoElements = this.state;
        var state = todoElements.done.some(e => e.key === elementKey);
        var selElem = (state) ? todoElements.done : todoElements.open;
        var elementIx = selElem.findIndex(el => el.key === elementKey);

        if (state) {
            delete todoElements.done[elementIx];
            todoElements.done = delEmptyArrayFields(todoElements.done);
        } else {
            delete todoElements.open[elementIx];
            todoElements.open = delEmptyArrayFields(todoElements.open);
        }

        this.setState(todoElements);
    }

    /* @function Changing the title of the Topic
     * @param evt The Event causing this action
     * This function is causing a new state and re-rendering */
    changeTitle(evt) {
        var todoElements = this.state;
        var newValue = evt.target.value;
        
        if (newValue.length <= 30) {
            todoElements.title = newValue;
            this.setState(todoElements);
        }
    }

    render() {
        var tKey = this.key;
        var state = this.state;

        return (
            <div className="TopicWrapper">
                <div className="Topic" id={this.componentKey}>
                    <div className="TopicTitle">
                        <button className="DeleteButton" type="submit" onClick={ () => this.onDeleteHandler(tKey) }>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                        <input className="InvisibleInput" onChange={ (evt) => this.changeTitle(evt) }
                        value={ this.state.title } type="text" placeholder="Set a Title" />
                    </div>
                    <div className="ToDoElements openToDo">
                        <h2>Open ToDos:</h2>
                        {
                            state.open.map(
                                element => <ToDoElement key={"todo_" + element.key} dataKey={element.key} onChangeHandler={() => this.changeStateOfElement(element.key)}
                                onDeleteHandler={ () => this.delElement(element.key) }  label={element.label} state={false} />
                            )
                        }
                    </div>
                    <div className="ToDoElements doneToDo">
                        <h2>Done ToDos:</h2>
                        {
                            state.done.map(
                                element => <ToDoElement key={"todo_" + element.key} dataKey={element.key} onChangeHandler={() => this.changeStateOfElement(element.key)}
                                onDeleteHandler={ () => this.delElement(element.key) } label={element.label} state={true} />
                            )
                        }
                    </div>
                </div>
                <div className="TopicForm">
                    <ToDoAddForm onAddElement={ (label) => this.addElement(label) }/>
                </div>
            </div>
        );
    }

    /* TODO: The following functions have to be connect to API @important */

    /* @function For syncing the API with the local cache/storage
     * If some changes were detected the application has to re-render */
    syncToDoTopic() {
        // Create Algorithm for syncing the API with local container (also title!)

        //var apiAnswer = Api.doRequest("topic/" + this.key + "?state=false", "GET");
        //var apiAnswer = Api.doRequest("topic/" + this.key + "?state=false", "GET");
    }
}