import './AddProject.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import projectValidation from '../../../main/validations/projectValidation';
import projectHTTPService from '../../../main/services/projectHTTPService';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';

interface AddProjectProps {
  closeModal: () => void;
}

interface ProjectState {
  title: string;
  description: string;
  starting_date: string;
  ending_date: string;
  users: string;
  client: string;
  status: string;
}

interface UserData {
  id: number;
  username: string;
  name: string;
}

interface ClientData {
  id: number;
  first_name: string;
  last_name: string;
}

const AddProject: React.FC<AddProjectProps> = ({ closeModal }) => {
  const initialState: ProjectState = {
    title: "",
    description: "",
    starting_date: "",
    ending_date: "",
    users: "",
    client: "",
    status: ''
  };

  const { register, handleSubmit, errors } = useForm<ProjectState>();
  const [project, setProject] = useState<ProjectState>(initialState);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: ProjectState) => {
    projectHTTPService.createProject(data).then(() => {
      setProject(initialState);
      showMessage('Confirmation', projectMessage.add, 'success');
      closeModal();
    });
  };

  useEffect(() => {
    retrieveUsers();
    retrieveClients();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const retrieveClients = () => {
    setLoading(true);
    clientHTTPService.getAllClient().then((response: { data: ClientData[] }) => {
      setLoading(false);
      setClients(response.data);
    });
  };

  const retrieveUsers = () => {
    setLoading(true);
    userHTTPService.getAllUser()
      .then((response: { data: UserData[] }) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <div className="AddProject">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.title}
            type="text" name="title" className="form-control" required />
          <div className="error text-danger">
            {errors.title && projectValidation.title}
          </div>
        </div>

        <div className="form-group">
          <label>Short Description<span className="text-danger">*</span></label>
          <textarea ref={register({ required: true })} onChange={handleInputChange} value={project.description}
            name="description" className="form-control"></textarea>
          <div className="error text-danger">
            {errors.description && projectValidation.description}
          </div>
        </div>

        <div className="form-group">
          <label>Start<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" className="form-control datepicker" />
          <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div>
        </div>

        <div className="form-group">
          <label>End<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" className="form-control datepicker" />
          <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div>
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
            name="status" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
          <div className="error text-danger">
            {errors.status && projectValidation.status}
          </div>
        </div>

        <div className="form-group">
          <label>User </label>
          <select ref={register({ required: true })} onChange={handleInputChange}
            value={project.users} name="users" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            {Array.isArray(users) && users.map(item =>
              <option key={item.id} value={item.username}>{item.name}</option>
            )}
          </select>
          <div className="error text-danger">
            {errors.users && projectValidation.users}
          </div>
        </div>

        <div className="form-group">
          <label>Client</label>
          <select ref={register({ required: true })} onChange={handleInputChange} value={project.client}
            name="client" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            {clients.map(item =>
              <option key={item.id} value={item.first_name + ' ' + item.last_name}>{item.first_name + ' ' + item.last_name}</option>
            )}
          </select>
          <div className="error text-danger">
            {errors.client && projectValidation.client}
          </div>
        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          Save
        </button>
      </form>
    </div>
  )
};

export default AddProject;
