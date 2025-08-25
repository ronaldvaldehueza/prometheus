import React, { useEffect, useState } from 'react';
import './Message.css';
import { LoadJS } from '../../../libraries/datatables/datatables';
import AddMessage from '../AddMessage/AddMessage';
import showMessage from '../../../libraries/messages/messages';
import messageMessage from '../../../main/messages/messageMessage';
import CurrentUser from '../../../main/config/user';

interface MessageData {
  destination: string;
  message: string;
}

const Message: React.FC = () => {

  const [messages, setMessages] = useState<MessageData[]>([]);
  const [updatedItem, setUpdatedItem] = useState<MessageData | {}>({});

  useEffect(() => {
    LoadJS();
    retrieveMessages();
  }, []);

  const retrieveMessages = () => {
    // This should be replaced with a real API call
    // For now, it does nothing.
    setMessages([]);
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    if (window.confirm(CurrentUser.DELTE_MSG)) {
      showMessage('Confirmation', messageMessage.delete, 'success');
      const newMessages = [...messages];
      newMessages.splice(index, 1);
      setMessages(newMessages);
    }
  };

  const update = (e: React.MouseEvent<HTMLButtonElement>, data: MessageData) => {
    e.preventDefault();
    setUpdatedItem(data);
  };

  return (
    <div className="card">
      <div className="card-header">
        <strong className="card-title">Mes Messages</strong>
      </div>
      <div className="card-body">
        <table id="example1" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((item, index) => (
              <tr key={index}>
                <td>{item.destination}</td>
                <td>{item.message}</td>
                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#editJob" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, index)} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Utilisateur</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addMessage"><i className="far fa-plus-square"></i>  Ajouter</button>

        <div className="modal fade" id="addMessage" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={retrieveMessages} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddMessage />
              </div>
              <div className="modal-footer">
                <button onClick={retrieveMessages} type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="editMessage" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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

        <div className="modal fade" id="viewMessage" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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

export default Message;
