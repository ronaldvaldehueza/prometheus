import React, { useEffect, useState } from 'react';
import './EditClient.css';
import { useForm } from 'react-hook-form';
import clientHTTPService from '../../../main/services/clientHTTPService';
import showMessage from '../../../libraries/messages/messages';
import clientMessage from '../../../main/messages/clientMessage';

interface ClientData {
  id: number;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
}

interface EditClientProps {
  client: ClientData | any;
  closeModal: () => void;
}

const EditClient: React.FC<EditClientProps> = ({ client: clientProp, closeModal }) => {

  const { register, handleSubmit, errors } = useForm();
  const [client, setClient] = useState(clientProp);

  useEffect(() => {
    setClient(clientProp);
  }, [clientProp]);

  const onSubmit = (data: any) => {
    clientHTTPService.editClient(clientProp.id, data).then(() => {
      closeModal();
      showMessage('Confirmation', clientMessage.edit, 'success');
    }).catch(e => {
      console.log(e);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  return (
    <div className="EditClient">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

          <div className="form-group col-md-12">
            <label>Company</label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.company}
              type="text" name="company" className="form-control" />
          </div>

          <div className="form-group col-md-6">
            <input type="hidden" name="groups" value="4" />
            <label>First name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.first_name}
              type="text" name="first_name" className="form-control" required />
          </div>

          <div className="form-group col-md-6">
            <label>Last name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.last_name}
              type="text" name="last_name" className="form-control" />
          </div>

          <div className="form-group col-md-6">
            <label>Email<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.email}
              type="email" name="email" className="form-control" />
          </div>

          <div className="form-group col-md-6">
            <label>Telephone</label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={client.phone}
              type="number" name="phone" className="form-control" />
          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          Save
        </button>
      </form>
    </div>
  )
};

export default EditClient;
