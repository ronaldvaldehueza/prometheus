import React from 'react';
import './Content.css';
import { Route } from "react-router-dom";
import DashBoard from '../../../modules/shared/DashBoard/DashBoard';
import Message from '../../../modules/message/Message/Message';
import Note from '../../../modules/note/Note/Note';
import Task from '../../../modules/mytask/Task/Task';
import Projects from '../../../modules/project/Projects/Projects';
import Tasks from '../../../modules/task/Tasks/Tasks';
import User from '../../../modules/user/User/User';
import Configuration from '../../../modules/shared/Configuration/Configuration';
import Client from '../../../modules/client/Client/Client';
import Profile from '../../../modules/shared/Profile/Profile';
import ProjectTimeLine from '../../../modules/shared/DashBoard/TimeLine';
import Login from '../Login/Login';
import ConfigurationModules from '../../../modules/shared/ConfigurationModules/ConfigurationModules';
import ProjectReport from '../../../modules/project/ProjectReport/ProjectReport';
import ProjectAnalytics from '../../../modules/project/ProjectAnalytics/ProjectAnalytics';
import TaskReport from '../../../modules/task/TaskReport/TaskReport';
import TaskAnalytics from '../../../modules/task/TaskAnalytics/TaskAnalytics';
import ProjectCalendar from '../../../modules/project/ProjectCalendar/ProjectCalendar';
import ProjectKanban from '../../../modules/project/ProjectKanban/ProjectKanban';
import Teams from '../../../modules/team/Teams/Teams';
import Contracts from '../../../modules/contract/Contracts/Contracts';
import taskKanban from '../../../modules/task/task-kanban/task-kanban';
import SearchProject from '../../../modules/shared/SearchProject/SearchProject';
import Register from '../Register/Register';

interface ContentProps {
  connected: boolean;
}

// Type assertion to bypass react-router-dom v5 type issue with React 17+
const RouteAsAny = Route as any;

const Content: React.FC<ContentProps> = ({ connected }) => (
  <div className="col-md-12" style={{ display: (connected ? 'block' : 'none') }}>
    <div>
      <RouteAsAny exact path="/" component={DashBoard} />
      <RouteAsAny exact path="/timeline" component={ProjectTimeLine} />
      <RouteAsAny exact path="/dashboard" component={DashBoard} />
      <RouteAsAny exact path="/projects" component={Projects} />
      <RouteAsAny exact path="/tasks" component={Tasks} />
      <RouteAsAny exact path="/task" component={Task} />
      <RouteAsAny exact path="/note" component={Note} />
      <RouteAsAny exact path="/message" component={Message} />
      <RouteAsAny exact path="/client" component={Client} />
      <RouteAsAny exact path="/user" component={User} />
      <RouteAsAny exact path="/configuration" component={Configuration} />
      <RouteAsAny exact path="/profile" component={Profile} />
      <RouteAsAny exact path="/login" component={Login} />
      <RouteAsAny exact path="/modules-configuration" component={ConfigurationModules} />
      <RouteAsAny exact path="/project-report" component={ProjectReport} />
      <RouteAsAny exact path="/project-analytics" component={ProjectAnalytics} />
      <RouteAsAny exact path="/task-report" component={TaskReport} />
      <RouteAsAny exact path="/task-analytics" component={TaskAnalytics} />
      <RouteAsAny exact path="/calendar" component={ProjectCalendar} />
      <RouteAsAny exact path="/project-kanban" component={ProjectKanban} />
      <RouteAsAny exact path="/contract" component={Contracts} />
      <RouteAsAny exact path="/team" component={Teams} />
      <RouteAsAny exact path="/task-kanban" component={taskKanban} />
      <RouteAsAny exact path="/register" component={Register} />
      <RouteAsAny path="/result/:input" component={SearchProject} />
    </div>
  </div>
);

export default Content;
