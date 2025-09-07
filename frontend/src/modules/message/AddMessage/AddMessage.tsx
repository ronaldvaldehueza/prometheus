import './AddMessage.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import messageMessage from '../../../main/messages/messageMessage';
import messageValidation from '../../../main/validations/messageValidation';

interface MessageState {
  title: string;
  destination: string;
  message: string;
}

const AddMessage: React.FC = () => {
  const initialState: MessageState = {
    title: "",
    destination: "",
    message: "",
  };

  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState<MessageState>(initialState);

  const onSubmit = (data: MessageState) => {
    // In a real app, you would use an HTTP service here
    // For now, just simulating success
    console.log(data);
    setMessage(initialState);
    showMessage('Confirmation', messageMessage.add, 'success');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMessage({ ...message, [name]: value });
  };

  return (
    <div className="AddMessage">
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group row">
          <label htmlFor="text1" className="col-4 col-form-label">Titre</label>
          <div className="col-8">
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={message.title} id="text1" name="title" type="text" className="form-control" />
            <div className="error text-danger">
              {errors.title && messageValidation.title}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="text" className="col-4 col-form-label">Destinataire</label>
          <div className="col-8">
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={message.destination} id="text" name="destination" type="text" className="form-control" />
            <div className="error text-danger">
              {errors.destination && messageValidation.destination}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="textarea" className="col-4 col-form-label">Message</label>
          <div className="col-8">
            <textarea ref={register({ required: true })} onChange={handleInputChange}
              value={message.message} id="textarea" name="message" cols={40} rows={5}
              className="form-control"></textarea>
            <div className="error text-danger">
              {errors.message && messageValidation.message}
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="offset-4 col-8">
            <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
              Sauvegarder
            </button>
          </div>
        </div>

      </form>
    </div>
  )
};

export default AddMessage;
