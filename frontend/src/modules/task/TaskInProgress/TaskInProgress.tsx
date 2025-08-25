import React, { useEffect, useState } from 'react';
import './TaskInProgress.css';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';

interface TaskData {
  id: number;
  title: string;
}

const TaskInProgress: React.FC = () => {
  const [tasksss, settasksss] = useState<TaskData[]>([]);

  useEffect(() => {
    mytaskHTTPService.getAllMyTask().then((response: { data: TaskData[] }) => {
      settasksss(response.data);
    });
  }, []);

  return (
    <div className="col-lg-6 col-xl-12">
      <div className="card bg-flat-color-3  ">
        <div className="card-body">
          <h4 className="box-title">Open Tasks </h4>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {tasksss.map(item =>
              <li key={item.id} className="list-group-item">{item.title}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskInProgress;
