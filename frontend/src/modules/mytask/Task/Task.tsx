import React, { useEffect, useState } from 'react';
import './Task.css';
import AddMyTask from '../AddMyTask/AddMyTask';
import EditMyTask from '../EditMyTask/EditMyTask';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import taskMessage from '../../../main/messages/taskMessage';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import MyTaskSummary from '../../../modules/task/MyTaskSummary/MyTaskSummary';
import CurrentUser from '../../../main/config/user';

interface TaskData {
  id: number;
  project_id: number;
  title: string;
  deadline: string;
  priority: string;
  assigned: string;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<TaskData | {}>({});
  const [loading, setLoading] = useState(false);
  const [updatedItemId, setUpdatedItemId] = useState(0);

  useEffect(() => {
    LoadJS();
    retrieveTasks();
  }, []);

  const retrieveTasks = () => {
    setLoading(true);
    mytaskHTTPService.getAllMyTask()
      .then((response: { data: TaskData[] }) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((e: any) => {
        console.log(e);
        setLoading(false);
      });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      showMessage('Confirmation', taskMessage.delete, 'success');
      // Here you would typically call a service to delete the item from the backend
      const newTasks = tasks.filter(task => task.id !== data);
      setTasks(newTasks);
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: TaskData) => {
    e.preventDefault();
    setUpdatedItem(data);
    // Logic to open edit modal or handle update
  };

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'project_id', headerName: 'Project', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'deadline', headerName: 'Due Date', width: 200, cellClassName: 'deadline-color' },
    { field: 'priority', headerName: 'Priority', width: 200, cellClassName: 'priority-color' },
    { field: 'assigned', headerName: 'Assigned', width: 200 }
  ];

  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      const selectedId = e[0] as number;
      setUpdatedItemId(selectedId);
      const selectedItem = tasks.find(item => item.id === selectedId);
      if (selectedItem) {
        setUpdatedItem(selectedItem);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title">My Tasks</strong>
      </div>
      <div className="card-body">
        <MyTaskSummary />

        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={tasks}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}

        <div className="modal fade" id="addTask" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={retrieveTasks} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddMyTask />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveTasks} type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="editTask" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditMyTask />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Task;
