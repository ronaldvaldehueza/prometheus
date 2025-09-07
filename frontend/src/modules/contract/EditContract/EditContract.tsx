import React, { useEffect, useState } from 'react';
import './EditContract.css';
import contractHTTPService from '../../../main/services/contractHTTPService';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';

interface ContractData {
  id: number;
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

interface EditContractProps {
  contract: ContractData | any;
  closeModal: () => void;
}

const EditContract: React.FC<EditContractProps> = ({ contract: contractProp, closeModal }) => {

  const { register, handleSubmit, errors } = useForm();
  const [contract, setContract] = useState(contractProp);

  useEffect(() => {
    setContract(contractProp);
  }, [contractProp]);

  const onSubmit = (data: any) => {
    contractHTTPService.editContract(contractProp.id, data).then(() => {
      closeModal();
      showMessage('Confirmation', "Contract edited successfully", 'success');
    }).catch(e => {
      console.log(e);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContract({ ...contract, [name]: value });
  };

  return (
    <div className="EditContract">
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
            <input ref={register({ required: true })} onChange={handleInputChange} value={contract.contractValue}
              type="number" name="contractValue" className="form-control" />

            <label>Type<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={contract.contractType}
              type="text" name="contractType" className="form-control" />

            <label>Website<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={contract.website}
              type="text" name="website" className="form-control" />

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
  )
};

export default EditContract;
