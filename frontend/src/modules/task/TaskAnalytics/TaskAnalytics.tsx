import React, { useEffect, useState } from 'react';
import './TaskAnalytics.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskAnalytics: React.FC = () => {
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
    <div className="card">
      <div className="card-header">
        <strong className="card-title"><i className="fas fa-chart-pie"></i>Task Analytics</strong>
      </div>
      <div className="col-lg-6 col-xl-6">
        <Pie data={{
          labels: ['To do', 'In Progress', 'Completed', 'In Review'],
          datasets: [
            {
              label: '# of Votes',
              data: [todo, inprogress, completed, inreview],
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
                'rgba(111, 111, 86, 0.2)'
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

export default TaskAnalytics;
