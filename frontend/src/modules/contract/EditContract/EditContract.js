import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditContract.css';
import contractHTTPService from '../../../main/services/contractHTTPService';

import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';

const EditContract = (props) => {

  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [contract, setContract] = useState(props.contract);
  const [typeSubs, setTypeSubs] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setContract(props.contract)

  }, [props.contract]);


  const onSubmit = (data) => {
    console.log(data)
    contractHTTPService.editContract(props.contract.id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', "contractMessage.edit", 'success')
    }).catch(e => {
      console.log(e)
    })

  }

  const handleInputChange = event => {
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
                name="client" className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow"
              >
                <option value="Mike Dean">Mike Dean</option>
                <option value="John Doe">John Doe</option>
              </select>

            </div>



            <div className="form-group">
              <label>Project<span className="text-danger">*</span></label>
              <select ref={register({ required: true })} onChange={handleInputChange}
                value={contract.project} name="project" id="project"
                className="selectpicker form-control border-0 mb-1 px-4 py-4 rounded shadow" tabIndex="-1" aria-hidden="true">

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
              type="text" name="description" className="form-control" ></textarea>

          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i>
          <font   ><font   > Save</font></font></button>
      </form>
    </div>
  )
};

EditContract.propTypes = {};

EditContract.defaultProps = {};

export default EditContract;
