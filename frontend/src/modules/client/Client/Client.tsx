import React, { useEffect, useRef, useState } from 'react';
import './Client.css';
import AddClient from './../AddClient/AddClient';
import EditClient from './../EditClient/EditClient';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import clientHTTPService from '../../../main/services/clientHTTPService';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import CurrentUser from '../../../main/config/user';

interface ClientData {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
}

const Client: React.FC = () => {

  const [clients, setClients] = useState<ClientData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<ClientData | {}>({});
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef<HTMLButtonElement>(null);
  const closeButtonAdd = useRef<HTMLButtonElement>(null);
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState<number[]>([]);

  const closeModalEdit = () => {
    retrieveClients();
    closeButtonEdit.current?.click();
  };

  const closeModalAdd = () => {
    retrieveClients();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
    LoadJS();
    retrieveClients();
  }, []);

  const retrieveClients = () => {
    setLoading(true);
    clientHTTPService.getAllClient().then((response: { data: ClientData[] }) => {
      setLoading(false);
      setClients(response.data);
    });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      showMessage('Confirmation', clientMessage.delete, 'success');
      clientHTTPService.removeClient(data).then(() => {
        retrieveClients();
      });
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: ClientData | {}) => {
    e.preventDefault();
    setUpdatedItem(data);
    retrieveClients();
  };

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'last_name', headerName: 'Last name', width: 200 },
    { field: 'first_name', headerName: 'First name', width: 200 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Telephone', width: 200 },
  ];

  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      const selectedId = e[0] as number;
      setUpdatedItemId(selectedId);
      const selectedItem = clients.find(item => item.id === selectedId);
      if (selectedItem) {
        setUpdatedItem(selectedItem);
      }
    }
    setUpdatedItemIds(e as number[]);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fa fa-handshake-o"></i> Clients</h4>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient"><i className="far fa-plus-square"></i>  Create</button>
        <button type="button" onClick={(e) => update(e, updatedItem)} data-toggle="modal" data-target="#edit" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i> edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={clients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}

        <div className="modal fade" id="addClient" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLongTitle">New</h4>
                <button onClick={retrieveClients} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddClient closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveClients} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="edit" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLongTitle">Edit</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditClient client={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveClients} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
