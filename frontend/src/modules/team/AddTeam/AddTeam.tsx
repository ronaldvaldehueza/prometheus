import React, { useState } from 'react';
import './AddTeam.css';
import teamHTTPService from '../../../main/services/teamHTTPService';

import { useForm } from 'react-hook-form';
import noteMessage from '../../../main/messages/noteMessage';
import showMessage from '../../../libraries/messages/messages';


interface AddTeamProps {
  closeModal: () => void;
}

interface TeamState {
  name: string;
  minimum: string;
  maximum: string;
}

type FormData = {
  name: string;
  minimum: string;
  maximum: string;
};


const AddTeam: React.FC<AddTeamProps> = (props) => {
  const initialState: TeamState = {
    name: "",
    minimum: "",
    maximum: "",
  };

  const { register, handleSubmit, errors } = useForm<FormData>();
  const [team, setTeam] = useState<TeamState>(initialState);

  const onSubmit = (data: FormData) => {
    teamHTTPService.createTeam(data).then(data => {
      setTeam(initialState)
      showMessage('Confirmation', noteMessage.add, 'success')
      props.closeModal()
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value });
  };


  return (
    <div className="AddTeam">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">

          <div className="form-group col-md-12">
            <label>Name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.name}
              type="text" name="name" className="form-control" />

            <label>Minimum<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.minimum}
              type="number" name="minimum" className="form-control" />

            <label>Maximum<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.maximum}
              type="number" name="maximum" className="form-control" />
          </div>

        </div>
        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  )
};

export default AddTeam;
