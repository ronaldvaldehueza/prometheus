import React from 'react';
import './ViewTask.css';

const ViewTask: React.FC = () => (
  <div className="ViewTask">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className="nav-link active" href="#">Overview</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" href="#">Activity</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" href="#">Comments</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Actions</a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Mark as Review</a>
          <a className="dropdown-item" href="#">Mark as to to do</a>
          <a className="dropdown-item" href="#">Mark as Blocked</a>
          <a className="dropdown-item" href="#">Mark as Done</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Copy</a>
          <a className="dropdown-item" href="#">Edit</a>
          <a className="dropdown-item" href="#">Delete</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
);

export default ViewTask;
