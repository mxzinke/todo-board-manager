import React from 'react';
import ToDo from './ToDo';
import '../../assets/styles/topics/Topic.css';
import deleteIcon from '../../assets/icons/actions/delete.svg';
import ToDoAddForm from '../forms/ToDoAddForm';
import { topicsService, todoService } from '../../services/Websocket';
import { NO_ELEMENT_FOUND, EMPTY_LENGTH, cleanUp } from '../../utils';

/* @class Generating the topic based overview of the To-Do's */
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

    topicsService.on('patched', (result) => {
      const stateCopy = this.state;
      if (result.key === this.key && stateCopy.title !== result.title) {
        stateCopy.title = result.title;
        this.setState(stateCopy);
      }
    });
    todoService.on('created', () => this.syncTopic());
    todoService.on('removed', (result) => {
      if (result !== undefined) {
        const todoElements = this.state;
        const selElem = result.state ? todoElements.done : todoElements.open;
        const elementIx = selElem.findIndex((el) => el.key === result.key);

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

  changeStateOfElement(elementKey, oldState) {
    todoService
      .patch(elementKey, {}, { query: { switchState: 1 } })
      .then((result) => {
        if (result !== undefined && result.state !== oldState) {
          this.syncTopic();
        } else {
          // TODO: Add user feedback at patch-fail
        }
      });
  }

  addElement(newLabel) {
    const todoElements = this.state;

    todoService
      .create({
        label: newLabel,
        topicKey: this.key
      })
      .then((result) => {
        if (result !== undefined) {
          todoElements.open.push(result);
          this.setState(todoElements);
        } else {
          this.syncTopic();
        }
      });
  }

  delElement(elementKey) {
    const todoElements = this.state;

    todoService.remove(elementKey).then((result) => {
      if (result !== undefined) {
        const selElem = result.state ? todoElements.done : todoElements.open;
        const elementIx = selElem.findIndex((el) => el.key === elementKey);

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

  changeTitle(evt) {
    const newState = this.state;
    const newTitle = evt.target.value;

    const MAX_LENGTH = 30;

    if (newTitle.length <= MAX_LENGTH) {
      newState.title = newTitle;
      this.setState(newState);
    }
  }

  async syncTopic() {
    topicsService.get(this.key).then((result) => {
      if (result === undefined) {
        this.refreshSite();
      }

      const newState = this.state;

      newState.title = result.title;
      newState.open = result.elements.filter((e) => e.state === false);
      newState.done = result.elements.filter((e) => e.state === true);

      this.setState(newState);
    });
  }

  async syncTitle() {
    const newTitle = this.state.title;
    topicsService.patch(this.key, { title: newTitle }).then((result) => {
      if (result.title !== newTitle) {
        this.refreshSite();
      }
    });
  }

  render() {
    const tKey = this.key;
    const { state } = this;

    let doneElements;

    if (state.done.length > EMPTY_LENGTH) {
      doneElements = (
        <div className="ToDoElements doneToDo">
          <h2>Done:</h2>
          {state.done.map((element) => (
            <ToDo
              key={`todo_${element.key}`}
              dataKey={element.key}
              onChange={() => this.changeStateOfElement(element.key, true)}
              onDelete={() => this.delElement(element.key)}
              label={element.label}
              state
            />
          ))}
        </div>
      );
    } else {
      doneElements = null;
    }

    return (
      <div className="TopicWrapper">
        <div className="Topic" id={this.componentKey}>
          <div className="TopicTitle">
            <button
              className="DeleteButton"
              type="submit"
              onClick={() => this.onDeleteHandler(tKey)}>
              <img src={deleteIcon} alt="Delete" />
            </button>
            <input
              className="InvisibleInput"
              onChange={(evt) => this.changeTitle(evt)}
              value={state.title}
              type="text"
              onBlur={() => this.syncTitle()}
              placeholder="Set a Title"
            />
          </div>
          <div className="ToDoElements openToDo">
            <h2>Open:</h2>
            {state.open.map((element) => (
              <ToDo
                key={`todo_${element.key}`}
                dataKey={element.key}
                onChange={() => this.changeStateOfElement(element.key, false)}
                onDelete={() => this.delElement(element.key)}
                label={element.label}
                state={false}
              />
            ))}
          </div>
          {doneElements}
        </div>
        <div className="TopicForm">
          <ToDoAddForm onAddElement={(label) => this.addElement(label)} />
        </div>
      </div>
    );
  }
}
