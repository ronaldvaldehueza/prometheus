import React, { useEffect, useState } from 'react';
import './EditTeam.css';
import { useForm } from 'react-hook-form';
import teamHTTPService from '../../../main/services/teamHTTPService'
import showMessage from '../../../libraries/messages/messages';

interface Team {
  id: string | number;
  name: string;
  minimum: number | string;
  maximum: number | string;
}

interface EditTeamProps {
  team: Team;
  closeModal: () => void;
}

type FormData = {
  name: string;
  minimum: string;
  maximum: string;
};

const EditTeam: React.FC<EditTeamProps> = (props) => {

  const { register, handleSubmit, errors } = useForm<FormData>() // initialise the hook
  const [team, setTeam] = useState<Team>(props.team);
  const [typeSubs, setTypeSubs] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    setTeam(props.team)
  }, [props.team]);


  const onSubmit = (data: FormData) => {
    teamHTTPService.editTeam(props.team.id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', "teamMessage.edit", 'success')
    }).catch(e => {
      console.log(e)
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeam({ ...team, [name]: value } as Team);
  };

  return (
    <div className="EditTeam">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Name<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={team.name}
              type="text" name="name" className="form-control" />

            <label>Minimum <span className="text-danger">*</span></label>
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

export default EditTeam;
