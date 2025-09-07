import './AddNote.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import noteValidation from '../../../main/validations/noteValidation';
import noteHTTPService from '../../../main/services/noteHTTPService';

interface AddNoteProps {
  closeModal: () => void;
}

interface NoteState {
  description: string;
  name: string;
}

const AddNote: React.FC<AddNoteProps> = ({ closeModal }) => {
  const initialState: NoteState = {
    description: "",
    name: ""
  };

  const { register, handleSubmit, errors } = useForm();
  const [note, setNote] = useState<NoteState>(initialState);

  const onSubmit = (data: NoteState) => {
    noteHTTPService.createNote(data).then(() => {
      setNote(initialState);
      showMessage('Confirmation', noteMessage.add, 'success');
      closeModal();
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <div className="AddNote">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Title<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange} value={note.name}
              type="text" name="name" className="form-control" />

            <label>Description<span className="text-danger">*</span></label>
            <textarea ref={register({ required: true })} onChange={handleInputChange} value={note.description}
              name="description" className="form-control"></textarea>
            <div className="error text-danger">
              {errors.description && noteValidation.description}
            </div>
          </div>
        </div>
        <button type="submit" id="save-form" className="btn btn-success">
          <i className="fa fa-check"></i> Save
        </button>
      </form>
    </div>
  );
};

export default AddNote;
