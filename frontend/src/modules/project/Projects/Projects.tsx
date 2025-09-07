import React, { useRef, useState, useEffect } from 'react';
import './Projects.css';
import AddProject from '../AddProject/AddProject';
import EditProject from './../EditProject/EditProject';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import projectHTTPService from '../../../main/services/projectHTTPService';
import { NavLink as NavLinkBase } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import ProjectSummary from '../../../modules/project/ProjectSummary/ProjectSummary';
import CurrentUser from '../../../main/config/user';

const NavLink = NavLinkBase as any;

interface ProjectData {
  id: number;
  title: string;
  starting_date: string;
  ending_date: string;
  users: string;
  status: string;
  client: string;
  description: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<ProjectData | {}>({});
  const closeButtonEdit = useRef<HTMLButtonElement>(null);
  const closeButtonAdd = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [updatedItemId, setUpdatedItemId] = useState(0);

  const closeModalEdit = () => {
    retrieveProjects();
    closeButtonEdit.current?.click();
  };

  const closeModalAdd = () => {
    retrieveProjects();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
    LoadJS();
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    setLoading(true);
    projectHTTPService.getAllProject().then((response: { data: ProjectData[] }) => {
      setProjects(response.data);
      setLoading(false);
    });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      showMessage('Confirmation', projectMessage.delete, 'success');
      projectHTTPService.removeProject(data).then(() => {
        retrieveProjects();
      });
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: ProjectData | {}) => {
    e.preventDefault();
    setUpdatedItem(data);
  };

  const copy = (e: React.MouseEvent<HTMLButtonElement>, data: ProjectData | any) => {
    projectHTTPService.copyProject(data.id).then(() => {
      retrieveProjects();
    });
  };

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'title', headerName: 'Title', width: 200, cellClassName: 'title-color' },
    { field: 'starting_date', headerName: 'Start', width: 200, cellClassName: 'start-date-color' },
    { field: 'ending_date', headerName: 'End', width: 200, cellClassName: 'end-date-color' },
    { field: 'users', headerName: 'Users', width: 200 },
    { field: 'status', headerName: 'Status', width: 200, cellClassName: 'status-color' },
    { field: 'client', headerName: 'Client', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
  ];

  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      const selectedId = e[0] as number;
      setUpdatedItemId(selectedId);
      const selectedItem = projects.find(item => item.id === selectedId);
      if (selectedItem) {
        setUpdatedItem(selectedItem);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fa fa-folder"></i> Projects</h4>
      </div>
      <div className="card-body">
        <ProjectSummary />
        <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#addProject"><i className="far fa-plus-square"></i>  Create</button>
        <button onClick={e => copy(e, updatedItem)} type="button" className="btn btn-warning btn-sm"><i className="fas fa-copy"></i> Copy</button>
        <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" className="btn btn-info btn-sm"><i className="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>
        <button onClick={retrieveProjects} type="button" className="btn btn-secondary btn-sm"><i className="fas fa-repeat"></i> Reload</button>
        <div className="btn-group">
          <button type="button" className="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="menu-icon fa fa-male"></i>  Switch to
          </button>
          <div className="dropdown-menu">
            <NavLink className="dropdown-item" to="/projects">List view</NavLink>
            <NavLink className="dropdown-item" to="/project-kanban">Kanban view</NavLink>
            <NavLink className="dropdown-item" to="/calendar">Calendar view</NavLink>
            <NavLink className="dropdown-item" to="/timeline" >Gantt view</NavLink>
          </div>
        </div>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={projects}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}

        <div className="modal fade" id="addProject" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddProject closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button ref={closeButtonAdd} onClick={retrieveProjects} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                <EditProject project={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveProjects} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Projects;
