import React, { useEffect, useState, useCallback } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import projectHTTPService from '../../../main/services/projectHTTPService';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';
import ProjectInProgress from '../../../modules/project/ProjectInProgress/ProjectInProgress';
import TaskInProgress from '../../../modules/task/TaskInProgress/TaskInProgress';
import DashboardSummary from '../../../modules/shared/DashboardSummary/DashboardSummary';
import settingsHTTPService from '../../../main/services/settingsHTTPService';
import { useHistory } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

interface TaskData {
  id: number;
  title: string;
  startdate: string;
  deadline: string;
  priority: string;
  assigned: string;
  status: string;
}

interface DashboardSettings {
  showSummary: string;
  showExpenseIncomeCharts: string;
}

const DashBoard: React.FC = () => {
  const [myTasks, setTasks] = useState<TaskData[]>([]);
  const [todo, setTodo] = useState<number>(0);
  const [inprogress, setInprogress] = useState<number>(0);
  const [done, setDone] = useState<number>(0);
  const [blocked, setBlocked] = useState<number>(0);
  const [dashboardSettings, setDashboardSettings] = useState<DashboardSettings | any>({});
  const [completed, setCompleted] = useState<number>(0);
  const [inreview, setInreview] = useState<number>(0);
  let history = useHistory();

  const getDashboardSettings = useCallback(() => {
    settingsHTTPService.getDashboardSettings().then(response => {
      setDashboardSettings(response.data[0] || {});
    });
  }, []);

  const loadChartData = useCallback(() => {
    projectHTTPService.findprojectByStatus().then(response => {
      // Assuming this sets data for a chart, which is not directly used.
    });
    mytaskHTTPService.getAllMyTask().then(response => {
      setTasks(response.data);
    });
    projectHTTPService.getTodo().then(response => {
      setTodo(response.data.todo);
    });
    projectHTTPService.getInprogress().then(response => {
      setInprogress(response.data.inprogress);
    });
    projectHTTPService.getDone().then(response => {
      setDone(response.data.done);
    });
    projectHTTPService.getBlocked().then(response => {
      setBlocked(response.data.blocked);
    });
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

  useEffect(() => {
    if (localStorage.getItem('connected') === undefined) {
      history.push("/login");
    }
    loadChartData();
    getDashboardSettings();
  }, [history, loadChartData, getDashboardSettings]);

  return (
    <div className="col-md-12">
      {dashboardSettings.showSummary === "1" && <DashboardSummary />}
      <div className="col-lg-12">
        <div className="card">
          {dashboardSettings.showExpenseIncomeCharts === "1" && (
            <div className="row">
              <div className="col-lg-6">
                <div className="card-body">
                  <h4 className="box-title">Projects </h4>
                  <Pie data={{
                    labels: ['To do', 'In progress', 'Done', 'Blocked'],
                    datasets: [{
                      label: '# of Votes',
                      data: [todo, inprogress, done, blocked],
                      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(111, 111, 86, 0.2)'],
                      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(111, 111, 86, 1)'],
                      borderWidth: 1,
                    }],
                  }} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card-body">
                  <h4 className="box-title">Tasks </h4>
                  <Pie data={{
                    labels: ['To do', 'In Progress', 'Completed', 'In Review'],
                    datasets: [{
                      label: '# of Votes',
                      data: [todo, inprogress, completed, inreview],
                      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(111, 111, 86, 0.2)'],
                      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(111, 111, 86, 0.2)'],
                      borderWidth: 1,
                    }],
                  }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="orders">
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body">
                <h4 className="box-title"> Tasks </h4>
              </div>
              <div className="card-body--">
                <div className="table-stats order-table ov-h">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th className="serial">#</th>
                        <th className="avatar">Task</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Priority</th>
                        <th>Assigned</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myTasks.map(item => (
                        <tr key={item.id}>
                          <td className="serial">{item.id}</td>
                          <td className="avatar">{item.title}</td>
                          <td>{item.startdate}</td>
                          <td><span className="name">{item.deadline}</span></td>
                          <td><span className="product">{item.priority}</span></td>
                          <td><span className="count">{item.assigned}</span></td>
                          <td><span className="badge badge-complete">{item.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="row">
              <ProjectInProgress />
              <TaskInProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
