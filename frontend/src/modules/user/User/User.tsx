import React, { useEffect, useRef, useState } from 'react';
import './User.css';
import AddUser from './../AddUser/AddUser';
import EditUser from './../EditUser/EditUser';
import ViewUser from './../ViewUser/ViewUser';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import userMessage from '../../../main/messages/userMessage';
import { Typography, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import userHTTPService from '../../../main/services/userHTTPService';
import CurrentUser from '../../../main/config/user';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  phone: string;
}

const User: React.FC = () => {

  const [users, setUsers] = useState<UserData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<UserData | {}>([]);
  const [loading, setLoading] = useState(false);
  const closeButtonAdd = useRef<HTMLButtonElement>(null);
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState<number[]>([]);

  const closeModalAdd = () => {
    retrieveUsers();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
    LoadJS();
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    setLoading(true);
    userHTTPService.getAllUser()
      .then((response: { data: UserData[] }) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      userHTTPService.removeUser(data).then(() => {
        showMessage('Confirmation', userMessage.delete, 'success');
        retrieveUsers();
      });
    }
  };

  const columns = [
    { field: 'id', headerName: '#', width: 30 },
    { field: 'first_name', headerName: 'Firstname', width: 200 },
    { field: 'last_name', headerName: 'Lastname', width: 200 },
    { field: 'role', headerName: 'Role', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 }
  ];

  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      const selectedId = e[0] as number;
      setUpdatedItemId(selectedId);
      const selectedItem = users.find(item => item.id === selectedId);
      if (selectedItem) {
        setUpdatedItem(selectedItem);
      }
    }
    setUpdatedItemIds(e as number[]);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fas fa-restroom"></i> Collaborators</h4>
      </div>
      <div className="card-body">

        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addUser"><i className="far fa-plus-square"></i>  Create</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}

        <div className="modal fade" id="addUser" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={retrieveUsers} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddUser closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveUsers} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                <EditUser />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="viewUser" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ViewUser />
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

export default User;
