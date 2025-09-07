import React, { useEffect, useRef, useState } from 'react';
import './Contracts.css';
import contractHTTPService from '../../../main/services/contractHTTPService';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import AddContract from '../../../modules/contract/AddContract/AddContract';
import EditContract from '../../../modules/contract/EditContract/EditContract';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import CurrentUser from '../../../main/config/user';

interface ContractData {
  id: number;
  title: string;
  date: string;
  client: string;
  project: string;
}

const Contracts: React.FC = () => {
  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<ContractData | {}>({});
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef<HTMLButtonElement>(null);
  const closeButtonAdd = useRef<HTMLButtonElement>(null);
  const [updatedItemId, setUpdatedItemId] = useState(0);

  const closeModalEdit = () => {
    retrieveContracts();
    closeButtonEdit.current?.click();
  };

  const closeModalAdd = () => {
    retrieveContracts();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
    LoadJS();
    retrieveContracts();
  }, []);

  const retrieveContracts = () => {
    setLoading(true);
    contractHTTPService.getAllContract().then((response: { data: ContractData[] }) => {
      setContracts(response.data);
      setLoading(false);
    });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      showMessage('Confirmation', clientMessage.delete, 'success');
      contractHTTPService.removeContract(data).then(() => {
        retrieveContracts();
      });
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: ContractData | {}) => {
    e.preventDefault();
    setUpdatedItem(data);
    retrieveContracts();
  };

  const columns = [
    { field: 'id', headerName: '#', width: 20 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'client', headerName: 'Client', width: 200 },
    { field: 'project', headerName: 'Project', width: 200 }
  ];

  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      const selectedId = e[0] as number;
      setUpdatedItemId(selectedId);
      const selectedItem = contracts.find(item => item.id === selectedId);
      if (selectedItem) {
        setUpdatedItem(selectedItem);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fas fa-file-contract"></i> Contracts</h4>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient"><i className="far fa-plus-square"></i>  Create</button>
        <button onClick={(e) => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>

        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={contracts}
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
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={retrieveContracts} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddContract closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveContracts} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                <EditContract contract={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveContracts} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
