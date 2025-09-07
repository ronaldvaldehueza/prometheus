import React, { useEffect, useRef, useState } from 'react';
import './Teams.css';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import teamHTTPService from '../../../main/services/teamHTTPService';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import AddTeam from '../../../modules/team/AddTeam/AddTeam'
import EditTeam from '../../../modules/team//EditTeam/EditTeam'
import { Typography, Button, LinearProgress } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import CurrentUser from '../../../main/config/user';

interface Team {
  id: number | string;
  name: string;
  minimum: number | string;
  maximum: number | string;
}

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [updatedItem, setUpdatedItem] = useState<Team | {}>({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef<HTMLButtonElement | null>(null);
  const closeButtonAdd = useRef<HTMLButtonElement | null>(null);


  const closeModalEdit = () => {
    resfresh()
    closeButtonEdit.current?.click()
  }

  const closeModalAdd = () => {
    resfresh()
    closeButtonAdd.current?.click()
  }
  useEffect(() => {
    LoadJS()
    retrieveClients()
  }, []);

  const retrieveClients = () => {
    setLoading(true)
    teamHTTPService.getAllTeam().then(data => {
      setLoading(false)
      setTeams(data.data)
    });
  };

  const resfresh = () => {
    retrieveClients()
    forceUpdate()
  }

  const remove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: string | number) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      showMessage('Confirmation', clientMessage.delete, 'success')
      teamHTTPService.removeTeam(data).then(data => {
        resfresh()
      })
    }
  }

  const update = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: Team) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'minimum', headerName: 'Minimum Number', width: 200 },
    { field: 'maximum', headerName: 'Maximum Number', width: 200 }
  ];


  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0])
      const selectedItem = teams.find(item => item.id === e[0])
      if (selectedItem) {
        setUpdatedItem(selectedItem)
      }
    }
    setUpdatedItemIds(e as (string | number)[])
  }

  const [updatedItemId, setUpdatedItemId] = useState<string | number>(0);
  const [updatedItemIds, setUpdatedItemIds] = useState<(string | number)[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const removeAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      /*   certificateHTTPService.removeAllCertificates().then(data => {
          getAllPatient()
        }) */
    }
  }
  return (

    <div className="card">

      <div className="card-header">
        <h4><i className="menu-icon fas fa-users-cog"></i> Teams</h4>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addClient"><i className="far fa-plus-square"></i>  Create</button>
        <button type="button" onClick={e => update(e, updatedItem as Team)} data-toggle="modal" data-target="#edit" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>
        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={teams}
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
                <button onClick={resfresh} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddTeam closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

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
                <EditTeam team={updatedItem as Team} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="viewClient" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

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

export default Teams;
