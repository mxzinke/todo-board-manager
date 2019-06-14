import React from 'react';
import ToDoElement from './ToDoElement';
import '../assets/styles/Topic.css';
import deleteIcon from '../assets/icons/delete.svg';
import ToDoAddForm from './ToDoAddForm';
import { delEmptyArrayFields } from '../App';
import { topicsService, todoService, socket } from '../connector';

/* @class Generating the topic based overview of the To-Do's 
 * @param key For generating DOM-key and the key for API-Request */
export default class Topic extends React.Component {

    constructor(params) {
        super(params);
        this.componentKey = params.dataKey;
        this.key = params.dataKey;
        this.state = {
            title: "",
            open: [],
            done: []
        };

        this.refreshSite = params.onIssueRefresh;
        this.onDeleteHandler = params.onDeleteHandler;

        this.syncTopic();

        socket.on('topics patched', result => {
            var stateCopy = this.state;
            if (result.key === this.key && stateCopy.title !== result.title) {
                stateCopy.title = result.title;
                this.setState(stateCopy);
            }
        });

        socket.on('elements created', () => this.syncTopic());
        socket.on('elements removed', result => {
            if (result !== undefined) {
                var todoElements = this.state;
                var selElem = (result.state) ? todoElements.done : todoElements.open;
                var elementIx = selElem.findIndex(el => el.key === result.key);

                if (elementIx !== -1) {
                    if (result.state) {
                        delete todoElements.done[elementIx];
                        todoElements.done = delEmptyArrayFields(todoElements.done);
                    } else {
                        delete todoElements.open[elementIx];
                        todoElements.open = delEmptyArrayFields(todoElements.open);
                    }
                    this.setState(todoElements);
                } else {
                    this.syncTopic();
                }
            }
        });
        socket.on('elements patched', () => this.syncTopic());
    }

    /* @function Changing the State of a Element: done ←→ open
     * @param elementKey The key of the key which want to move
     * This function is causing a new state and re-rendering */
    changeStateOfElement(elementKey, oldState) {
        todoService.patch(elementKey, {}, {query: { switchState: 1 }}).then( result => {
            if (result !== undefined && result.state !== oldState) {
                this.syncTopic();
            } else {
                console.log("An error occurred at server side. Cannot update state of element", elementKey);
            }
        });
    }

    /* @function Adding a new ToDo Element to the "Open"-Field
     * @param newLabel the new Label for the To-Do-Element
     * This function is causing a new state and re-rendering */
    addElement(newLabel) {
        var todoElements = this.state;

        todoService.create({
            label: newLabel,
            topicKey: this.key
        }).then( result => {
            if (result !== undefined) {
                result.state = undefined;
                result.topicKey = undefined;

                todoElements.open.push(result);
                this.setState(todoElements);
            } else {
                this.syncTopic();
            }
        });
    }

    /* @function Deleting a ToDo-Element
     * @param elementKey The key of the ToDoElement of the topics list
     * This function is causing a new state and re-rendering */
    delElement(elementKey) {
        var todoElements = this.state;

        todoService.remove(elementKey).then( result => {
            if (result !== undefined) {
                var selElem = (result.state) ? todoElements.done : todoElements.open;
                var elementIx = selElem.findIndex(el => el.key === elementKey);

                if (result.state) {
                    delete todoElements.done[elementIx];
                    todoElements.done = delEmptyArrayFields(todoElements.done);
                } else {
                    delete todoElements.open[elementIx];
                    todoElements.open = delEmptyArrayFields(todoElements.open);
                }

                this.setState(todoElements);
            } else {
                this.refreshSite();
            }
        });        
    }

    /* @function Changing the title of the Topic
     * @param evt The Event causing this action
     * This function is causing a new state and re-rendering */
    changeTitle(evt) {
        var newState = this.state;
        var newTitle = evt.target.value;
        
        if (newTitle.length <= 30) {
            newState.title = newTitle;
            this.setState(newState);
        }
    }

    render() {
        var tKey = this.key;
        var state = this.state;

        var doneElements;

        if (state.done.length > 0) {
            doneElements = (<div className="ToDoElements doneToDo">
                                <h2>Done:</h2>
                                {
                                    state.done.map(
                                        element => <ToDoElement key={"todo_" + element.key} dataKey={element.key} onChangeHandler={() => this.changeStateOfElement(element.key, true)}
                                        onDeleteHandler={ () => this.delElement(element.key) } label={element.label} state={true} />
                                    )
                                }
                            </div>)
        } else {
            doneElements = (null);
        }

        return (
            <div className="TopicWrapper">
                <div className="Topic" id={this.componentKey}>
                    <div className="TopicTitle">
                        <button className="DeleteButton" type="submit" onClick={ () => this.onDeleteHandler(tKey) }>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                        <input className="InvisibleInput" onChange={ (evt) => this.changeTitle(evt) }
                        value={ state.title } type="text" onBlur={ () => this.syncTitle() } placeholder="Set a Title" />
                    </div>
                    <div className="ToDoElements openToDo">
                        <h2>Open:</h2>
                        {
                            state.open.map(
                                element => <ToDoElement key={"todo_" + element.key} dataKey={element.key} onChangeHandler={() => this.changeStateOfElement(element.key, false)}
                                onDeleteHandler={ () => this.delElement(element.key) }  label={element.label} state={false} />
                            )
                        }
                    </div>
                    { doneElements }
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
    async syncTopic() {
        try {
            topicsService.get(this.key).then( result => {
                if (result === undefined) {
                    this.refreshSite();
                }

                var newState = this.state;
                
                newState.title = result.title
                newState.open = result.elements.filter(e => e.state === false);
                newState.done = result.elements.filter(e => e.state === true);

                this.setState(newState);
            });
        } catch(e) {
            console.log("Error at entrypoint /topics:", e);
        }
    }

    async syncTitle() {
        var newTitle = this.state.title;
        topicsService.patch(this.key, { title: newTitle }).then( result => {
            if (result.title !== newTitle) {
                this.refreshSite();
            }
        })
    }
}