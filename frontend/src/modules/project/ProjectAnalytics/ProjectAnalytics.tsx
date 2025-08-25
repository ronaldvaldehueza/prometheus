import React, { useEffect, useState } from 'react';
import './ProjectAnalytics.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectAnalytics: React.FC = () => {
  const [todo, setTodo] = useState<number>(0);
  const [inprogress, setInprogress] = useState<number>(0);
  const [done, setDone] = useState<number>(0);
  const [blocked, setBlocked] = useState<number>(0);

  useEffect(() => {
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
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title"><i className="fas fa-chart-pie"></i>Project Analytics</strong>
      </div>
      <div className="col-lg-6 col-xl-6">
        <Pie data={{
          labels: ['To do', 'In progress', 'Done', 'Blocked'],
          datasets: [
            {
              label: '# of Votes',
              data: [todo, inprogress, done, blocked],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(111, 111, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(111, 111, 86, 1)'
              ],
              borderWidth: 1,
            },
          ],
        }} />
        <br />
      </div>
    </div>
  );
};

export default ProjectAnalytics;
