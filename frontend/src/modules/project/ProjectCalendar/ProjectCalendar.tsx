import React, { useEffect, useState } from 'react';
import './ProjectCalendar.css';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import { NavLink as NavLinkBase } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';

const NavLink = NavLinkBase as any;

interface ProjectData {
  title: string;
  starting_date: string;
  ending_date: string;
}

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  color: string;
}

const ProjectCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    const eve: CalendarEvent[] = [];
    const colors = ['orange', 'blue', 'green', 'yellow', 'red'];
    projectHTTPService.getAllProject().then((res: { data: ProjectData[] }) => {
      for (const item of res.data) {
        const index = Math.floor(Math.random() * colors.length);
        eve.push({ title: item.title, start: item.starting_date, end: item.ending_date, color: colors[index] });
      }
      setEvents(eve);
    });
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
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
        />
      </div>
    </div>
  );
};

export default ProjectCalendar;
