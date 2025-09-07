import React, { useEffect, useState } from 'react';
import './EditTask.css';
import taskMessage from '../../../main/messages/taskMessage';
import taskHHTPService from '../../../main/services/taskHHTPService';
import showMessage from '../../../libraries/messages/messages';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../../main/services/userHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';

interface TaskData {
  id: number;
  project: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  status: string;
  assigned: string;
}

interface UserData {
  id: number;
  username: string;
  name: string;
}

interface ProjectData {
  id: number;
  title: string;
}

interface EditTaskProps {
  task: TaskData | any;
  closeModal: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task: taskProp, closeModal }) => {
  const { register, handleSubmit, errors } = useForm();
  const [task, setTask] = useState(taskProp);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    setTask(taskProp);
  }, [taskProp]);

  const onSubmit = (data: any) => {
    taskHHTPService.editTask(taskProp.id, data).then(() => {
      closeModal();
      showMessage('Confirmation', taskMessage.edit, 'success');
    }).catch(e => {
      console.log(e);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    retrieveUsers();
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    setLoading(true);
    projectHTTPService.getAllProject().then(response => {
      setProjects(response.data);
      setLoading(false);
    });
  };

  const retrieveUsers = () => {
    setLoading(true);
    userHTTPService.getAllUser()
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <div className="EditTask">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="form-group">
          <label>Project<span className="text-danger">*</span></label>
          <select name="project_id" id="project" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
            onChange={handleInputChange} value={task?.project}
            ref={register({ required: true })}>
            {projects.map(item =>
              <option key={item.id} value={item.title}>{item.title}</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Title<span className="text-danger">*</span></label>
          <input type="text" name="title" className="form-control" required onChange={handleInputChange} value={task.title}
            ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>Short Description<span className="text-danger">*</span></label>
          <textarea name="description" className="form-control" onChange={handleInputChange} value={task.description}
            ref={register({ required: true })}></textarea>
        </div>

        <div className="form-group">
          <label>Due Date<span className="text-danger">*</span></label>
          <input type="date" name="deadline" className="form-control datepicker" required
            onChange={handleInputChange} value={task.deadline}
            ref={register({ required: true })} />
        </div>

        <div className="form-group">
          <label>Priority<span className="text-danger">*</span></label>
          <select onChange={handleInputChange} value={task.priority}
            ref={register({ required: true })} name="priority" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option id="low" value="Low">Low</option>
            <option id="medium" value="Medium">Medium</option>
            <option id="high" value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status<span className="text-danger">*</span></label>
          <select onChange={handleInputChange} value={task.status}
            ref={register({ required: true })} name="status" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            <option id="todo" value="Todo">Todo</option>
            <option id="inprogress" value="In Progress">In Progress</option>
            <option id="inreview" value="In Review">In Review</option>
            <option id="completed" value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>User </label>
          <select onChange={handleInputChange} value={task.assigned}
            ref={register({ required: true })} name="assigned" id="users_append" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
            {users.map(item =>
              <option key={item.id} value={item.username}>{item.name}</option>
            )}
          </select>
        </div>

        <button name="submit" type="submit" className="btn btn-primary"><i className="far fa-save"></i>
          Save</button>
      </form>
    </div>
  );
};

export default EditTask;
