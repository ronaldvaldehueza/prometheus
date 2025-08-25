import React, { useState, useEffect } from 'react';
import { DragDropContext, DragDropContextProps } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import { Board } from '../../../main/shared/kanban/Board/Board';
import { NavLink as NavLinkBase } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';

const NavLink = NavLinkBase as any;

interface CardData {
  id: number | string;
  title: string;
  status: string;
}

interface ColumnData {
  id: number;
  title: string;
  cardIds: (number | string)[];
}

interface ProjectData {
  title: string;
  status: string;
}

let _columnId = 0;
let _cardId = 0;

const ProjectKanban: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [columns, setColumns] = useState<ColumnData[]>([]);

  useEffect(() => {
    let projectList: CardData[] = [];
    projectHTTPService.getAllProject()
      .then((response: { data: ProjectData[] }) => {
        for (const item of response.data) {
          let projectObject = {
            id: item.title, // Using title as ID as in original code
            title: item.title,
            status: item.status,
          };
          projectList.push(projectObject);
        }

        const initcolumn = ['Todo', 'In Progress', 'Done', 'Blocked'].map((title, i) => ({
          id: _columnId++,
          title,
          cardIds: projectList.filter(s => s.status === title).map(card => card.id),
        }));

        setCards(projectList);
        setColumns(initcolumn);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const addColumn = (_title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newColumn: ColumnData = {
      id: ++_columnId,
      title,
      cardIds: [],
    };
    setColumns(prevColumns => [...prevColumns, newColumn]);
  };

  const addCard = (columnId: number, _title: string) => {
    const title = _title.trim();
    if (!title) return;

    const newCard: CardData = { id: ++_cardId, title, status: '' };
    setCards(prevCards => [...prevCards, newCard]);
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, newCard.id] }
          : column
      )
    );
  };

  const moveCard = (cardId: number | string, destColumnId: number, index: number) => {
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          (ids: (string | number)[]) =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          (ids: (string | number)[]) => ids.filter(id => id !== cardId)
        )(column.cardIds),
      }))
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fa fa-folder"></i> Projects</h4>
      </div>
      <div className="card-body">
        <div className="btn-group">
          <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div className="dropdown-menu">
            <NavLink className="dropdown-item" to="/projects">List view</NavLink>
            <NavLink className="dropdown-item" to="/project-kanban">Kanban view</NavLink>
            <NavLink className="dropdown-item" to="/calendar">Calendar view</NavLink>
            <NavLink className="dropdown-item" to="/timeline" >Gantt view</NavLink>
          </div>
        </div>
        <Board
          cards={cards}
          columns={columns}
          moveCard={moveCard}
          addCard={addCard}
          addColumn={addColumn}
        />
      </div>
    </div>
  );
};

export default DragDropContext(HTML5Backend)(ProjectKanban);
