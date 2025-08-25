import React, { useEffect, useRef, useState } from 'react';
import './Note.css';
import AddNote from './../AddNote/AddNote';
import EditNote from './../EditNote/EditNote';
import ViewNote from './../ViewNote/ViewNote';
import { LoadJS } from '../../../libraries/datatables/datatables';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import noteHTTPService from '../../../main/services/noteHTTPService';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridToolbar, GridSelectionModel } from '@mui/x-data-grid';
import CurrentUser from '../../../main/config/user';

interface NoteData {
  id: number;
  name: string;
  description: string;
}

const Note: React.FC = () => {

  const [notes, setNotes] = useState<NoteData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<NoteData | {}>({});
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef<HTMLButtonElement>(null);
  const closeButtonAdd = useRef<HTMLButtonElement>(null);
  const [updatedItemId, setUpdatedItemId] = useState(0);

  const closeModalEdit = () => {
    retrieveNotes();
    closeButtonEdit.current?.click();
  };

  const closeModalAdd = () => {
    retrieveNotes();
    closeButtonAdd.current?.click();
  };

  useEffect(() => {
    LoadJS();
    retrieveNotes();
  }, []);

  const retrieveNotes = () => {
    setLoading(true);
    noteHTTPService.getAllNote().then((response: { data: NoteData[] }) => {
      setNotes(response.data);
      setLoading(false);
    });
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, data: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      noteHTTPService.removeNote(data).then(() => {
        showMessage('Confirmation', noteMessage.delete, 'success');
        retrieveNotes();
      });
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: NoteData) => {
    e.preventDefault();
    setUpdatedItem(data);
  };

  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'name', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 }
  ];

  const handleRowSelection = (e: GridSelectionModel) => {
    if (e.length === 1) {
      const selectedId = e[0] as number;
      setUpdatedItemId(selectedId);
      const selectedItem = notes.find(item => item.id === selectedId);
      if (selectedItem) {
        setUpdatedItem(selectedItem);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4><i className="menu-icon fa fa-clipboard-list"></i> Notes</h4>
      </div>
      <div className="card-body">
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addNote"><i className="far fa-plus-square"></i>  Create</button>
        <button onClick={(e) => update(e, updatedItem as NoteData)} type="button" data-toggle="modal" data-target="#edit" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i> Edit</button>
        <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>

        {loading ?
          <LinearProgress />
          : <div style={{ height: 430, width: '100%' }}><DataGrid
            rows={notes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[6]}
            checkboxSelection
            onSelectionModelChange={handleRowSelection}
            components={{ Toolbar: GridToolbar }}
          /></div>}

        <div className="modal fade" id="addNote" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={retrieveNotes} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddNote closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveNotes} ref={closeButtonAdd} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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
                <EditNote note={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={retrieveNotes} ref={closeButtonEdit} className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="viewNote" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ViewNote />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
