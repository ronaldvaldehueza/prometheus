import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './EditNote.css';
import noteHTTPService from '../../../main/services/noteHTTPService';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';

const EditNote = (props) => {

  const { register, handleSubmit, errors } = useForm() // initialise the hook
  const [note, setNote] = useState(props.note);
  const [typeSubs, setTypeSubs] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setNote(props.note)

  }, [props.note]);


  const onSubmit = (data) => {
    console.log(data)
    noteHTTPService.editNote(props.note.id, data).then(data => {
      props.closeModal()
      showMessage('Confirmation', noteMessage.edit, 'success')
    }).catch(e => {
      console.log(e)
    })

  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };


  return (
    <div className="EditNote">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="row">
          <div className="form-group col-md-12">
            <label>Title<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={note.name}
              type="text" name="name" className="form-control" />

            <label>Description<span className="text-danger">*</span></label>
            <textarea type="text" name="description" className="form-control" onChange={handleInputChange} value={note.description} ref={register({ required: true })} ></textarea>
          </div>
        </div>
        <button name="submit" type="submit" className="btn btn-primary"><i className="far fa-save"></i>
          Save</button></form>
    </div>
  )

};

EditNote.propTypes = {};

EditNote.defaultProps = {};

export default EditNote;
