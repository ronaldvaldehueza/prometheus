import './AddMyTask.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import showMessage from '../../../libraries/messages/messages';
import myTaskMessage from '../../../main/messages/myTaskMessage';
import myTaskValidation from '../../../main/validations/myTaskValidation';

interface MyTaskState {
  todo: string;
  due_date: string;
}

const AddMyTask: React.FC = () => {
  const initialState: MyTaskState = {
    todo: "",
    due_date: "",
  };

  const { register, handleSubmit, errors } = useForm();
  const [myTask, setMyTask] = useState<MyTaskState>(initialState);

  const onSubmit = (data: MyTaskState) => {
    // In a real app, you would use an HTTP service here
    console.log(data);
    setMyTask(initialState);
    showMessage('Confirmation', myTaskMessage.add, 'success');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMyTask({ ...myTask, [name]: value });
  };

  return (
    <div className="AddMyTask">
      <form method="POST" className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Tache<span className="text-danger">*</span></label>
            <textarea ref={register({ required: true })} onChange={handleInputChange}
              value={myTask.todo} name="todo" className="form-control"></textarea>
            <div className="error text-danger">
              {errors.todo && myTaskValidation.todo}
            </div>
          </div>

          <div className="form-group col-md-12">
            <label>date échéance<span className="text-danger">*</span></label>
            <input ref={register({ required: true })} onChange={handleInputChange}
              value={myTask.due_date} type="date" name="due_date" className="form-control datepicker" />
            <div className="error text-danger">
              {errors.due_date && myTaskValidation.due_date}
            </div>
          </div>
        </div>

        <button type="submit" id="save-form" className="btn btn-success"><i className="fa fa-check"></i>
          Sauvegarder
        </button>
      </form>
    </div>
  )
};

export default AddMyTask;
