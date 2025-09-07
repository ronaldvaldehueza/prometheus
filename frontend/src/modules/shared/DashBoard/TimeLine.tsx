import React, { useEffect, useState } from 'react';
import TimeLine from "react-gantt-timeline";
import { NavLink as NavLinkBase } from 'react-router-dom';
import projectHTTPService from '../../../main/services/projectHTTPService';

const NavLink = NavLinkBase as any;

interface ProjectData {
  id: number;
  title: string;
  starting_date: string;
  ending_date: string;
}

interface TimeLineEvent {
  id: number;
  start: Date;
  end: Date;
  name: string;
  color: string;
}

interface TimeLineLink {
  id: number;
  start: number;
  end: number;
}

const ProjectTimeLine: React.FC = () => {
  const [projects, setProjects] = useState<TimeLineEvent[]>([]);
  const links: TimeLineLink[] = [{ id: 1, start: 1, end: 2 }];

  useEffect(() => {
    getAllProjects();
  }, []);

  const getAllProjects = () => {
    let projectList: TimeLineEvent[] = [];
    projectHTTPService.getAllProject()
      .then((response: { data: ProjectData[] }) => {
        const colors = ['orange', 'blue', 'green', 'yellow', 'red'];
        for (const item of response.data) {
          const index = Math.floor(Math.random() * colors.length);
          const projectObject: TimeLineEvent = {
            id: item.id,
            start: new Date(item.starting_date),
            end: new Date(item.ending_date),
            name: item.title,
            color: colors[index]
          };
          projectList.push(projectObject);
        }
        setProjects(projectList);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="horizontal-scrollable">
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
            <TimeLine data={projects} links={links} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeLine;
