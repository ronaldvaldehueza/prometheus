import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './Navigation.css';
import taskHHTPService from '../../services/taskHHTPService';
import userHTTPService from '../../services/userHTTPService';
import { AxiosResponse } from 'axios';

interface NavigationProps {
  connected: boolean;
}

const NavLinkAsAny = NavLink as any;

const Navigation: React.FC<NavigationProps> = ({ connected }) => {
  const [tasks, setTasks] = useState<number>(0);
  const [users, setUsers] = useState<number>(0);

  useEffect(() => {
    getTasks();
    getUsers();
  }, []);

  const getTasks = () => {
    taskHHTPService.getCount().then((response: AxiosResponse<{ all: number }>) => {
      setTasks(response.data.all);
    });
  };

  const getUsers = () => {
    userHTTPService.getCount().then((response: AxiosResponse<{ all: number }>) => {
      setUsers(response.data.all);
    });
  };

  return (
    <aside id="left-panel" className="left-panel" style={{ display: connected ? 'block' : 'none' }}>
      <nav className="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/dashboard"><i className="menu-icon fa fa-laptop"></i>Dashboard </NavLinkAsAny>
            </li>

            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/task"><i className="menu-icon fa fa-dharmachakra"></i>My Tasks <span className="badge badge-primary">{tasks}</span></NavLinkAsAny>
            </li>

            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-list"></i>Tasks</a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/tasks">List</NavLinkAsAny>
                </li>
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/task-kanban">Kanban</NavLinkAsAny>
                </li>
              </ul>
            </li>

            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-folder"></i>Projects</a>
              <ul className="sub-menu children dropdown-menu">
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/projects">List</NavLinkAsAny>
                </li>
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/calendar">Calendar </NavLinkAsAny>
                </li>
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/timeline">Gantt </NavLinkAsAny>
                </li>
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/project-kanban">Kanban </NavLinkAsAny>
                </li>
              </ul>
            </li>

            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/team"><i className="menu-icon fas fa-users-cog"></i>Teams</NavLinkAsAny>
            </li>

            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/user"><i className="menu-icon fas fa-restroom"></i>Team Members<span className="badge badge-warning">{users}</span></NavLinkAsAny>
            </li>

            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/contract"><i className="menu-icon fas fa-file-contract"></i> Contracts </NavLinkAsAny>
            </li>

            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/client"><i className="menu-icon fa fa-handshake-o"></i>Clients </NavLinkAsAny>
            </li>

            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/note"><i className="menu-icon fa fa-clipboard-list"></i>Notes </NavLinkAsAny>
            </li>

            <li className="menu-item-has-children dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-area-chart"></i>Charts</a>
              <ul className="sub-menu children dropdown-menu sub-navigatio">
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/project-analytics">Project analytics </NavLinkAsAny>
                </li>
                <li>
                  <NavLinkAsAny activeClassName="activeLink" to="/task-analytics">Task analytics </NavLinkAsAny>
                </li>
              </ul>
            </li>
            <li>
              <NavLinkAsAny activeClassName="activeLink" to="/configuration"><i className="menu-icon fa fa-cog"></i>Settings </NavLinkAsAny>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Navigation;
