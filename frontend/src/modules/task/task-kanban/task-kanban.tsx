import './task-kanban.css';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from '../../../main/shared/kanban/Board/Board';
import taskHHTPService from '../../../main/services/taskHHTPService';

// Interfaces
interface Card {
  id: number | string;
  title: string;
  status: string;
}

interface Column {
  id: number;
  title: string;
  cardIds: (number | string)[];
}

interface TaskKanbanState {
  cards: Card[];
  columns: Column[];
}

// No external props are passed
interface TaskKanbanProps { }

let _columnId = 0;
let _cardId = 0;

// Dummy data for initial render
const initialCards: Card[] = Array.from({ length: 9 }).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
  status: 'TODO', // Add status to match Card interface
}));

const initialColumns: Column[] = ['TODO', 'Doing', 'Done'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 3, i * 3 + 3).map(card => card.id),
}));

class TaskKanban extends Component<TaskKanbanProps, TaskKanbanState> {
  state: TaskKanbanState = {
    cards: initialCards,
    columns: initialColumns,
  };

  // These seem unused, but I'll keep and type them
  inprogress: (string | number)[] = [];
  done: (string | number)[] = [];
  blocked: (string | number)[] = [];
  todo: (string | number)[] = [];

  componentDidMount() {
    taskHHTPService.getAllTask()
      .then(response => {
        const taskList: Card[] = [];
        // Assuming response.data is an array of tasks from the API
        for (const item of response.data) {
          const taskCard: Card = {
            id: item.id, // Assuming API provides 'id', not using item.title as id
            title: item.title,
            status: item.status,
          };
          taskList.push(taskCard);
        }

        const initcolumn: Column[] = ['Todo', 'In Progress', 'In Review', 'Completed'].map((title, i) => ({
          id: i, // Use a stable id
          title,
          cardIds: taskList.filter(s => s.status === title).map(card => card.id),
        }));

        this.setState({
          cards: taskList,
          columns: initcolumn,
        });
      }).catch(e => {
        console.log(e);
      });
  }

  addColumn = (_title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newColumn: Column = {
      id: ++_columnId,
      title,
      cardIds: [],
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCard = (columnId: number, _title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newCard: Card = { id: ++_cardId, title, status: 'TODO' }; // Default status
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? { ...column, cardIds: [...column.cardIds, newCard.id] }
            : column
      ),
    }));
  };

  moveCard = (cardId: number | string, destColumnId: number, index: number) => {
    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          (ids: (string | number)[]) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          (ids: (string | number)[]) => ids.filter(id => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };

  render() {
    return (
      <div className="card">

        <div className="card-header">
          <h4><i className="menu-icon fa fa-list"></i> Tasks</h4>
        </div>
        <div className="card-body">

          <div className="btn-group">
            <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="menu-icon fa fa-male"></i>  Switch to
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Kanban</a>
              <a className="dropdown-item" href="#">Calendar</a>
              <a className="dropdown-item" href="#">Gantt</a>
            </div>
          </div>

          <Board
            cards={this.state.cards}
            columns={this.state.columns}
            moveCard={this.moveCard}
            addCard={this.addCard}
            addColumn={this.addColumn}
          />

        </div>
      </div>
    );
  }
};

export default DragDropContext(HTML5Backend)(TaskKanban);
