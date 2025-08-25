import './AddClient.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';
import clientValidation from '../../../main/validations/clientValidation';
import clientHTTPService from '../../../main/services/clientHTTPService';

interface AddClientProps {
  closeModal: () => void;
}

interface ClientState {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  email: string;
  company: string;
}

const AddClient: React.FC<AddClientProps> = ({ closeModal }) => {
  const initialState: ClientState = {
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: "",
    company: ""
  };

  const { register, handleSubmit, errors } = useForm();
  const [client, setClient] = useState<ClientState>(initialState);

  const onSubmit = (data: ClientState) => {
    clientHTTPService.createClient(data).then(() => {
      setClient(initialState);
      showMessage('Confirmation', clientMessage.add, 'success');
      closeModal();
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  return (
    <div className="AddClient">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

          <div className="form-group col-md-12">
            <label>Company</label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.company}
              type="text" name="company" className="form-control" />
            <div className="error text-danger">
              {errors.company && clientValidation.company}
            </div>
          </div>

          <div className="form-group col-md-6">
            <input type="hidden" name="groups" value="4" />
            <label>First Name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.first_name}
              type="text" name="first_name" className="form-control" required />
            <div className="error text-danger">
              {errors.first_name && clientValidation.first_name}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Last Name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.last_name}
              type="text" name="last_name" className="form-control" />
            <div className="error text-danger">
              {errors.last_name && clientValidation.last_name}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Email<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.email}
              type="email" name="email" className="form-control" />
            <div className="error text-danger">
              {errors.email && clientValidation.email}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Telephone</label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.phone}
              type="number" name="phone" className="form-control" />
            <div className="error text-danger">
              {errors.phone && clientValidation.phone}
            </div>
          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          Save
        </button>
      </form>
    </div>
  )
};

export default AddClient;
