import React, { useEffect, useState } from 'react';
import './EditNote.css';
import noteHTTPService from '../../../main/services/noteHTTPService';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import { useForm } from 'react-hook-form';

interface NoteData {
  id: number;
  name: string;
  description: string;
}

interface EditNoteProps {
  note: NoteData | any;
  closeModal: () => void;
}

const EditNote: React.FC<EditNoteProps> = ({ note: noteProp, closeModal }) => {

  const { register, handleSubmit, errors } = useForm();
  const [note, setNote] = useState(noteProp);

  useEffect(() => {
    setNote(noteProp);
  }, [noteProp]);

  const onSubmit = (data: any) => {
    noteHTTPService.editNote(noteProp.id, data).then(() => {
      closeModal();
      showMessage('Confirmation', noteMessage.edit, 'success');
    }).catch(e => {
      console.log(e);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <textarea name="description" className="form-control" onChange={handleInputChange} value={note.description} ref={register({ required: true })} ></textarea>
          </div>
        </div>
        <button name="submit" type="submit" className="btn btn-primary"><i className="far fa-save"></i>
          Save</button>
      </form>
    </div>
  );
};

export default EditNote;
