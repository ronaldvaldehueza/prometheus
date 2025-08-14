import React from 'react';
import PropTypes from 'prop-types';
import './ViewClient.css';

const ViewClient = () => (
  <div className="ViewClient">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className="nav-link active" href="#">Overview</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" href="#">Contract</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active" href="#">Project</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Separated link</a>
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

ViewClient.propTypes = {};

ViewClient.defaultProps = {};

export default ViewClient;
