import React, { useState } from 'react';
import './TaskReport.css';
import { useForm } from 'react-hook-form';
import projectHTTPService from '../../../main/services/projectHTTPService';

interface TaskReportState {
  status: string;
}

const TaskReport: React.FC = () => {
  const initialState: TaskReportState = {
    status: ''
  };

  const { register, handleSubmit, errors } = useForm();
  const [project, setProject] = useState<TaskReportState>(initialState);
  const [projectList, setProjectList] = useState<any[]>([]);

  const onSubmit = (data: TaskReportState) => {
    projectHTTPService.filterProject(data).then(response => {
      setProjectList(response.data);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <div className="TaskReport">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
          name="status" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
          <option value="started">Non Démarré</option>
          <option value="en cours">en cours</option>
          <option value="Fini">Fini</option>
        </select>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default TaskReport;
