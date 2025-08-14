import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { LoadJS } from '../../../libraries/datatables/datatables';
import AddMessage from '../AddMessage/AddMessage';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import messageMessage from '../../../main/messages/messageMessage';
import MessageTestService from '../../../main/mocks/MessageTestService';
import HTTPService from '../../../main/services/HTTPService';
import CurrentUser from '../../../main/config/user';



const deleteMessage = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}

const Message = () => {

  const [messages, setMessages] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();


  useEffect(() => {
    LoadJS()
    retrieveMessages()
  }, []);


  const getAll = () => {
    HTTPService.getAll()
      .then(response => {
        setMessages(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeOne = (data) => {
    HTTPService.remove(data)
      .then(response => {

      })
      .catch(e => {

      });
  }



  const retrieveMessages = () => {
    MessageTestService.getAll();
    setMessages(messages);
  };

  const resfresh = () => {
    retrieveMessages()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      showMessage('Confirmation', messageMessage.delete, 'success')
      MessageTestService.remove(data)
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }






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

            {messages.map(item =>
              <tr>
                <td>{item.destination}</td>
                <td>{item.message}</td>

                <td>
                  <button onClick={e => update(e, item)} type="button" data-toggle="modal" data-target="#editJob" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                  <button onClick={e => remove(e, messages.indexOf(item))} type="button" className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i></button></td>


              </tr>


            )}


            <tr>
              <td><span className="badge badge-primary">Yvette Bouchard</span></td>
              <td>Bonjour;</td>
              <td><button type="button" data-toggle="modal" data-target="#viewMessage" className="btn btn-primary btn-sm"><i className="fas fa-address-book"></i></button>
                <button type="button" data-toggle="modal" data-target="#editMessage" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                <button type="button" className="btn btn-danger btn-sm" onClick={deleteMessage}><i className="fas fa-trash-alt"></i></button></td>

            </tr>
            <tr>
              <td><span className="badge badge-primary">Laurent Fecteau</span></td>
              <td>Bonjour;</td>
              <td><button type="button" data-toggle="modal" data-target="#viewMessage" className="btn btn-primary btn-sm"><i className="fas fa-address-book"></i></button>
                <button type="button" data-toggle="modal" data-target="#editMessage" className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                <button type="button" className="btn btn-danger btn-sm" onClick={deleteMessage}><i className="fas fa-trash-alt"></i></button></td>

            </tr>
            <tfoot>
              <tr>
                <th>Utilisateur</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </tfoot>

          </tbody>
        </table>
        <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target="#addMessage"><i className="far fa-plus-square"></i>  Ajouter</button>

        <div className="modal fade" id="addMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button onClick={resfresh} type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddMessage />
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>


        <div className="modal fade" id="editMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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


        <div className="modal fade" id="viewMessage" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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

Message.propTypes = {};

Message.defaultProps = {};

export default Message;
