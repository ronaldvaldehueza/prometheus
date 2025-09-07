import React, { useEffect, useState } from 'react';
import './DashboardSummary.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';

const DashboardSummary: React.FC = () => {
  const [projectss, setProjectss] = useState<number>(0);
  const [taskss, setTaskss] = useState<number>(0);
  const [clientss, setClientss] = useState<number>(0);
  const [userss, setUserss] = useState<number>(0);

  useEffect(() => {
    getProjects();
    getTasks();
    getClients();
    getUsers();
  }, []);

  const getProjects = () => {
    projectHTTPService.getCount().then(response => {
      setProjectss(response.data.all);
    });
  };

  const getTasks = () => {
    taskHHTPService.getCount().then(response => {
      setTaskss(response.data.all);
    });
  };

  const getClients = () => {
    clientHTTPService.getCount().then(response => {
      setClientss(response.data.all);
    });
  };

  const getUsers = () => {
    userHTTPService.getCount().then(response => {
      setUserss(response.data.all);
    });
  };

  return (
    <div className="DashboardSummary">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-1">
                  <i className="fas fa-user-shield"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{projectss}</span>
                    </div>
                    <div className="stat-heading">Projects</div>
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
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{clientss}</span>
                    </div>
                    <div className="stat-heading">Clients</div>
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
                  <i className="fas fa-tasks"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{taskss}</span>
                    </div>
                    <div className="stat-heading">Tasks</div>
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
                      <span className="count">{userss}</span>
                    </div>
                    <div className="stat-heading">Users</div>
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

export default DashboardSummary;
