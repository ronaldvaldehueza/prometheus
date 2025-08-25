import React, { useEffect, useState } from 'react';
import './EditProject.css';
import projectHTTPService from '../../../main/services/projectHTTPService';
import projectMessage from '../../../main/messages/projectMessage';
import showMessage from '../../../libraries/messages/messages';
import { useForm } from 'react-hook-form';
import clientHTTPService from '../../../main/services/clientHTTPService';
import userHTTPService from '../../../main/services/userHTTPService';

interface ProjectData {
  id: number;
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

interface EditProjectProps {
  project: ProjectData | any;
  closeModal: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({ project: projectProp, closeModal }) => {

  const { register, handleSubmit, errors } = useForm();
  const [project, setProject] = useState(projectProp);
  const [clients, setClients] = useState<ClientData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProject(projectProp);
  }, [projectProp]);

  const onSubmit = (data: any) => {
    projectHTTPService.editProject(projectProp.id, data).then(() => {
      closeModal();
      showMessage('Confirmation', projectMessage.edit, 'success');
    }).catch(e => {
      console.log(e);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  useEffect(() => {
    retrieveUsers();
    retrieveClients();
  }, []);

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
    <div className="EditProject">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input type="text" name="title" className="form-control" onChange={handleInputChange} value={project.title} ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>Short description<span className="text-danger">*</span></label>
          <textarea name="description" className="form-control" onChange={handleInputChange} value={project.description} ref={register({ required: true })}></textarea>
        </div>

        <div className="form-group">
          <label>Start<span className="text-danger">*</span></label>
          <input type="date" name="starting_date" className="form-control datepicker" onChange={handleInputChange} value={project.starting_date} ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>End<span className="text-danger">*</span></label>
          <input type="date" name="ending_date" className="form-control datepicker" onChange={handleInputChange} value={project.ending_date} ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select name="status" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange} value={project.status} ref={register({ required: true })}>
            <option value="Todo">ToDo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        <div className="form-group">
          <label>User </label>
          <select name="users" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange}
            value={project.users} ref={register({ required: true })}>
            {users.map(item =>
              <option key={item.id} value={item.username}>{item.name}</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Client</label>
          <select name="client" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange} value={project.client} ref={register({ required: true })}>
            {clients.map(item =>
              <option key={item.id} value={item.first_name + ' ' + item.last_name}>{item.first_name + ' ' + item.last_name}</option>
            )}
          </select>
        </div>

        <button name="submit" type="submit" className="btn btn-primary"><i className="far fa-save"></i>
          Save</button>
      </form>
    </div>
  );
};

export default EditProject;
