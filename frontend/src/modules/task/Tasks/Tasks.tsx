import React, { useEffect, useRef, useState } from 'react';
import './Tasks.css';
import AddTask from '../AddTask/AddTask';
import EditTask from '../EditTask/EditTask';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import taskMessage from '../../../main/messages/taskMessage';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService';
import { NavLink as NavLinkBase } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import TaskSummary from '../../../modules/task/TaskSummary/TaskSummary';
import CurrentUser from '../../../main/config/user';

const NavLink = NavLinkBase as any;

interface TaskData {
  id: number;
  project: string;
  title: string;
  status: string;
  startdate: string;
  priority: string;
  assigned: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<TaskData | {}>({});
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef<HTMLButtonElement>(null);
  const closeButtonAdd = useRef<HTMLButtonElement>(null);
  const [updatedItemId, setUpdatedItemId] = useState(0);

  const closeModalEdit = () => {
    retrieveTasks();
    closeButtonEdit.current?.click();
  };

  const closeModalAdd = () => {
    retrieveTasks();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
    LoadJS();
    retrieveTasks();
  }, []);

  const retrieveTasks = () => {
    setLoading(true);
    mytaskHTTPService.getAllMyTask().then((response: { data: TaskData[] }) => {
      setTasks(response.data);
      setLoading(false);
    });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      mytaskHTTPService.removeMyTask(data).then(() => {
        showMessage('Confirmation', taskMessage.delete, 'success');
        retrieveTasks();
      });
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: TaskData | {}) => {
    e.preventDefault();
    setUpdatedItem(data);
  };

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'project', headerName: 'Project', width: 200 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'startdate', headerName: 'Start Date', width: 200, cellClassName: 'deadline-color' },
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
        <h4><i className="menu-icon fa fa-list"></i> Tasks</h4>
      </div>
      <div className="card-body">
        <TaskSummary />
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addTasks"><i className="far fa-plus-square"></i>  Create</button>

        <div className="btn-group">
          <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div className="dropdown-menu">
            <NavLink className="dropdown-item" to="/tasks">List view</NavLink>
            <NavLink className="dropdown-item" to="/task-kanban">Kanban view</NavLink>
          </div>
        </div>

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

        <div className="modal fade" id="addTasks" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={retrieveTasks} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddTask closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveTasks} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="edit" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditTask task={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveTasks} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Tasks;
