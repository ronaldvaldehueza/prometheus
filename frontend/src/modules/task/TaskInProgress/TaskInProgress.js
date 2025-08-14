import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './TaskInProgress.css';
import taskHHTPService from '../../../main/services/taskHHTPService';

const TaskInProgress = () => {

  const [tasksss, settasksss] = useState([]);


  useEffect(() => {

    taskHHTPService.getTopTask().then(data => {
      settasksss(data.data)
    })


  }, []);

  return (
    <div className="col-lg-6 col-xl-12">
      <div className="card bg-flat-color-3  ">
        <div className="card-body">
          <h4 className="box-title">Open Tasks </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {Array.isArray(tasksss) && tasksss && 
            tasksss.map(item =>
              <li key={item.id} className="list-group-item">{item.title}</li>

            )}
          </ul>
        </div>
      </div>
    </div>
  )

};

TaskInProgress.propTypes = {};

TaskInProgress.defaultProps = {};

export default TaskInProgress;
