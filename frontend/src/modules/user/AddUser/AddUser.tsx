import './AddUser.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import userMessage from '../../../main/messages/userMessage';
import userValidation from '../../../main/validations/userValidation';
import userHTTPService from '../../../main/services/userHTTPService';

interface AddUserProps {
  closeModal: () => void;
}

interface UserState {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  groups: string;
}

const AddUser: React.FC<AddUserProps> = ({ closeModal }) => {

  const initialState: UserState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    groups: ""
  };

  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useState<UserState>(initialState);

  const onSubmit = (data: UserState) => {
    userHTTPService.createUser(data).then((response: any) => {
      setUser(initialState);
      showMessage('Confirmation', userMessage.add, 'success');
      closeModal();
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="AddUser">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

          <div className="form-group col-md-6">
            <label>First name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.firstname} type="text" name="firstname" className="form-control" required />
            <div className="error text-danger">
              {errors.firstname && userValidation.first_name}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Last name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.lastname} type="text" name="lastname" className="form-control" />
            <div className="error text-danger">
              {errors.lastname && userValidation.last_name}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Email<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.email} type="email" name="email" className="form-control" />
            <div className="error text-danger">
              {errors.email && userValidation.email}
            </div>
          </div>

          <div className="form-group col-md-6">
            <label>Telephone</label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={user.phone} type="number" name="phone" className="form-control" />
            <div className="error text-danger">
              {errors.phone && userValidation.phone}
            </div>
          </div>


          <div className="form-group col-md-6">
            <label>Role<span className="text-danger">*</span></label>

            <select ref={register({ required: true })} onChange={handleInputChange}
              value={user.groups} name="role" className="form-control select2 select2-hidden-accessible"
              tabIndex={-1} aria-hidden="true">
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
            <div className="error text-danger">
              {errors.groups && userValidation.groups}
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

export default AddUser;
