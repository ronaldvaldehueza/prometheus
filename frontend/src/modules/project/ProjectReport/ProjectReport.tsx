import React, { useState } from 'react';
import './ProjectReport.css';
import { useForm } from 'react-hook-form';
import projectValidation from '../../../main/validations/projectValidation';
import projectHTTPService from '../../../main/services/projectHTTPService';

interface ProjectReportState {
  status: string;
  starting_date: string;
  ending_date: string;
}

interface ProjectData {
  status: string;
  // Assuming other properties exist based on context
  [key: string]: any;
}

const ProjectReport: React.FC = () => {
  const initialState: ProjectReportState = {
    status: '',
    starting_date: '',
    ending_date: ''
  };

  const { register, handleSubmit, errors } = useForm();
  const [project, setProject] = useState<ProjectReportState>(initialState);
  const [projectList, setProjectList] = useState<ProjectData[]>([]);

  const onSubmit = (data: ProjectReportState) => {
    projectHTTPService.filterProject(data).then(response => {
      setProjectList(response.data);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <div className="ProjectReport">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <select ref={register({ required: true })} onChange={handleInputChange} value={project.status}
          name="status" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
          <option value="started">Non Démarré</option>
          <option value="en cours">en cours</option>
          <option value="Fini">Fini</option>
        </select>

        <div className="form-group">
          <label>Début<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.starting_date}
            type="date" name="starting_date" className="form-control datepicker" />
          <div className="error text-danger">
            {errors.starting_date && projectValidation.starting_date}
          </div>
        </div>

        <div className="form-group">
          <label>fin<span className="text-danger">*</span></label>
          <input ref={register({ required: true })} onChange={handleInputChange} value={project.ending_date}
            type="date" name="ending_date" className="form-control datepicker" />
          <div className="error text-danger">
            {errors.ending_date && projectValidation.ending_date}
          </div>
        </div>
        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          Sauvegarder
        </button>
      </form>

      {projectList.map((item, index) => (
        <div key={index}>{item.status}</div>
      ))}
    </div>
  );
};

export default ProjectReport;
