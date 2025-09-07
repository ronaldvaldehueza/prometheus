import React, { useEffect, useState } from 'react';
import './AddContract.css';
import contractHTTPService from '../../../main/services/contractHTTPService';
import noteMessage from '../../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';
import projectHTTPService from '../../../main/services/projectHTTPService';
import showMessage from '../../../libraries/messages/messages';

interface AddContractProps {
  closeModal: () => void;
}

interface ContractState {
  title: string;
  date: string;
  client: string;
  project: string;
  company: string;
  note: string;
  contractValue: string;
  contractType: string;
  website: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProjectData {
  id: number;
  name: string;
}

const AddContract: React.FC<AddContractProps> = ({ closeModal }) => {
  const initialState: ContractState = {
    title: "",
    date: "",
    client: "",
    project: "",
    company: "",
    note: "",
    contractValue: "",
    contractType: "",
    website: "",
    startDate: "",
    endDate: "",
    description: ""
  };

  const { register, handleSubmit, errors } = useForm();
  const [contract, setContract] = useState<ContractState>(initialState);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const onSubmit = (data: ContractState) => {
    contractHTTPService.createContract(data).then(() => {
      setContract(initialState);
      showMessage('Confirmation', noteMessage.add, 'success');
      closeModal();
    });
  };

  useEffect(() => {
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    projectHTTPService.getAllProject().then((response: { data: ProjectData[] }) => {
      setProjects(response.data);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContract({ ...contract, [name]: value });
  };

  return (
    <div className="AddContract">
      <div className="AddNote">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Title<span className="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.title}
                type="text" name="title" className="form-control" />

              <label>Date<span className="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.date}
                type="date" name="date" className="form-control" />

              <div className="form-group">
                <label>Client</label>
                <select ref={register({ required: true })} onChange={handleInputChange} value={contract.client}
                  name="client" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow">
                  <option value="Mike Dean">Mike Dean</option>
                  <option value="John Doe">John Doe</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project<span className="text-danger">*</span></label>
                <select ref={register({ required: true })} onChange={handleInputChange}
                  value={contract.project} name="project" id="project"
                  className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex={-1} aria-hidden="true">
                  <option value="Projet 1">Project</option>
                </select>
              </div>

              <label>Company<span className="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.company}
                type="text" name="company" className="form-control" />

              <label>Value<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <input ref={register({ required: true })} onChange={handleInputChange} value={contract.contractValue}
                  type="number" name="contractValue" className="form-control" />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2"> $</span>
                </div>
              </div>

              <label>Type<span className="text-danger">*</span></label>
              <select ref={register({ required: true })} onChange={handleInputChange} value={contract.contractType} name="contractType" id="project"
                className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex={-1} aria-hidden="true">
                <option value="Fixed-price contracts">Fixed-price contracts</option>
                <option value="Cost-reimbursable Contracts">Cost-reimbursable Contracts</option>
                <option value="Time and materials (T&M)">Time and materials (T&M):</option>
              </select>

              <label>Website<span className="text-danger">*</span></label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">https://</span>
                </div>
                <input ref={register({ required: true })} onChange={handleInputChange} value={contract.website}
                  type="text" name="website" className="form-control" />
              </div>

              <label>Start<span className="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.startDate}
                type="date" name="startDate" className="form-control" />

              <label>End<span className="text-danger">*</span></label>
              <input ref={register({ required: true })} onChange={handleInputChange} value={contract.endDate}
                type="date" name="endDate" className="form-control" />

              <label>Description<span className="text-danger">*</span></label>
              <textarea ref={register({ required: true })} onChange={handleInputChange} value={contract.description}
                name="description" className="form-control" ></textarea>
            </div>
          </div>
          <button type="submit" id="save-form" className="btn btn-success">
            <i className="fa fa-check"></i> Save
          </button>
        </form>
      </div>
    </div>
  )
};

export default AddContract;
