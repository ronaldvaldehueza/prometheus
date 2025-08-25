import React, { useEffect, useState } from 'react';
import './TaskSummary.css';
import mytaskHTTPService from "../../../main/services/mytaskHTTPService";

const TaskSummary: React.FC = () => {
  const [todo, setTodo] = useState<number>(0);
  const [inprogress, setInprogress] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [inreview, setInreview] = useState<number>(0);

  useEffect(() => {
    mytaskHTTPService.getTodo().then(response => {
      setTodo(response.data.todo);
    });
    mytaskHTTPService.getInprogress().then(response => {
      setInprogress(response.data.inprogress);
    });
    mytaskHTTPService.getCompleted().then(response => {
      setCompleted(response.data.completed);
    });
    mytaskHTTPService.getinreview().then(response => {
      setInreview(response.data.inreview);
    });
  }, []);

  return (
    <div className="TaskSummary">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-1">
                  <i className="fas fa-list-ul"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{todo}</span>
                    </div>
                    <div className="stat-heading">Todo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-2">
                  <i className="far fa-play-circle"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{inprogress}</span>
                    </div>
                    <div className="stat-heading">In Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-3">
                  <i className="fas fa-check"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{completed}</span>
                    </div>
                    <div className="stat-heading">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-4">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{inreview}</span>
                    </div>
                    <div className="stat-heading">In review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
