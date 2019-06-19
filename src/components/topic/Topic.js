import React from 'react';
import ToDo from './ToDo';
import '../../assets/styles/topics/Topic.css';
import deleteIcon from '../../assets/icons/actions/delete.svg';
import ToDoAddForm from '../forms/ToDoAddForm';
import { topicsService, todoService } from '../../services/Websocket';
import { NO_ELEMENT_FOUND, cleanUp } from '../../utils';

/* @class Generating the topic based overview of the To-Do's 
 * @param key For generating DOM-key and the key for API-Request */
export default class Topic extends React.Component {

    constructor(params) {
        super(params);
        this.componentKey = params.dataKey;
        this.key = params.dataKey;
        this.state = {
            title: '',
            open: [],
            done: []
        };

        this.refreshSite = params.onIssueRefresh;
        this.onDeleteHandler = params.onDeleteHandler;

        this.syncTopic();

        topicsService.on('patched', result => {
            var stateCopy = this.state;
            if (result.key === this.key && stateCopy.title !== result.title) {
                stateCopy.title = result.title;
                this.setState(stateCopy);
            }
        });
        todoService.on('created', () => this.syncTopic());
        todoService.on('removed', result => {
            if (result !== undefined) {
                var todoElements = this.state;
                var selElem = (result.state) ? todoElements.done : todoElements.open;
                var elementIx = selElem.findIndex(el => el.key === result.key);

                if (elementIx !== NO_ELEMENT_FOUND) {
                    if (result.state) {
                        delete todoElements.done[elementIx];
                        todoElements.done = cleanUp(todoElements.done);
                    } else {
                        delete todoElements.open[elementIx];
                        todoElements.open = cleanUp(todoElements.open);
                    }
                    this.setState(todoElements);
                } else {
                    this.syncTopic();
                }
            }
        });
        todoService.on('patched', () => this.syncTopic());
    }

    /* @function Changing the State of a Element: done ←→ open
     * @param elementKey The key of the key which want to move
     * This function is causing a new state and re-rendering */
    changeStateOfElement(elementKey, oldState) {
        todoService.patch(elementKey, {}, {query: { switchState: 1 }}).then( result => {
            if (result !== undefined && result.state !== oldState) {
                this.syncTopic();
            } else {
                console.log(`An error occurred at server side. Can't update state of element ${elementKey}.`);
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
                    todoElements.done = cleanUp(todoElements.done);
                } else {
                    delete todoElements.open[elementIx];
                    todoElements.open = cleanUp(todoElements.open);
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

        const MAX_LENGTH = 30;
        
        if (newTitle.length <= MAX_LENGTH) {
            newState.title = newTitle;
            this.setState(newState);
        }
    }

    render() {
        var tKey = this.key;
        var state = this.state;

        var doneElements;

        const EMPTY_LENGTH = 0;

        if (state.done.length > EMPTY_LENGTH) {
            doneElements = (<div className="ToDoElements doneToDo">
                                <h2>Done:</h2>
                                {
                                    state.done.map(
                                        element => <ToDo key={'todo_' + element.key} dataKey={element.key}
                                        onChangeHandler={() => this.changeStateOfElement(element.key, true)}
                                        onDeleteHandler={ () => this.delElement(element.key) } label={element.label} state={true} />
                                    )
                                }
                            </div>);
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
                                element => <ToDo key={'todo_' + element.key} dataKey={element.key}
                                onChangeHandler={() => this.changeStateOfElement(element.key, false)}
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

    /* @function For syncing the API with the local cache/storage
     * If some changes were detected the application has to re-render */
    async syncTopic() {
        try {
            topicsService.get(this.key).then( result => {
                if (result === undefined) {
                    this.refreshSite();
                }

                var newState = this.state;
                
                newState.title = result.title;
                newState.open = result.elements.filter(e => e.state === false);
                newState.done = result.elements.filter(e => e.state === true);

                this.setState(newState);
            });
        } catch(e) {
            console.log('Error at endpoint "topics":', e);
        }
    }

    async syncTitle() {
        var newTitle = this.state.title;
        topicsService.patch(this.key, { title: newTitle }).then( result => {
            if (result.title !== newTitle) {
                this.refreshSite();
            }
        });
    }
}